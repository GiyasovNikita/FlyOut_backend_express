import knex from '../config/knex';

interface Flight {
    flight_id?: number;
    origin_airport: string;
    destination_airport: string;
    airline_code: string;
    flight_number: string;
    departure_at: Date;
    return_at: Date;
    duration: number;
}

interface FlightDetails {
    flight_details_id: number;
    flight_id: number;
    price: string;
    currency: string;
    baggage: boolean;
}

type DirectFlightResult = Flight & { details: FlightDetails | undefined };
type ConnectingFlightResult = {
    firstLeg: DirectFlightResult;
    secondLeg: DirectFlightResult;
};


const createFlight = async (flight: Flight) => {
    return knex('flight').insert(flight).returning('*');
};

const getAllFlights = async () => {
    return knex('flight').select('*');
};

const getFlightById = async (id: number) => {
    console.log(id);
    if (isNaN(id)) {
        console.error(`Invalid flight ID: ${id}`);
        throw new Error('Invalid flight ID');
    }
    return knex('flight').where({flight_id: id}).first();
};

const updateFlight = async (id: number, flight: Partial<Flight>) => {
    if (isNaN(id)) {
        throw new Error('Invalid flight IDw');
    }
    return knex('flight').where({flight_id: id}).update(flight).returning('*');
};

const deleteFlight = async (id: number) => {
    if (isNaN(id)) {
        throw new Error('Invalid flight IDe');
    }
    return knex('flight').where({flight_id: id}).del().returning('*');
};

const filterFlights = async (origin: string, destination: string, departureDate: string, returnDate?: string): Promise<{ directFlights: DirectFlightResult[], connectingFlights: ConnectingFlightResult[] }> => {
    console.log('Filtering flights with:', { origin, destination, departureDate, returnDate });

    // Поиск прямых рейсов
    let directQuery = knex('flight')
        .join('airport as origin_airport', 'flight.origin_airport', 'origin_airport.airport_code')
        .join('airport as destination_airport', 'flight.destination_airport', 'destination_airport.airport_code')
        .join('city as origin_city', 'origin_airport.city_id', 'origin_city.city_id')
        .join('city as destination_city', 'destination_airport.city_id', 'destination_city.city_id')
        .where('flight.origin_airport', origin)
        .andWhere('flight.destination_airport', destination)
        .andWhere('flight.departure_at', '>=', new Date(departureDate))
        .andWhere('flight.departure_at', '<', new Date(new Date(departureDate).getTime() + 24 * 60 * 60 * 1000))
        .select(
            'flight.*',
            'origin_city.city_name as origin_city_name',
            'destination_city.city_name as destination_city_name',
            'origin_airport.airport_name as origin_airport_name',
            'destination_airport.airport_name as destination_airport_name'
        );

    if (returnDate) {
        directQuery = directQuery.andWhere('flight.return_at', '>=', new Date(returnDate))
            .andWhere('flight.return_at', '<', new Date(new Date(returnDate).getTime() + 24 * 60 * 60 * 1000));
    }

    const directFlights: Flight[] = await directQuery;

    // Если найдены прямые рейсы, получить их детали
    let directFlightResults: DirectFlightResult[] = [];
    if (directFlights.length > 0) {
        const flightIds = directFlights.map(flight => flight.flight_id!);
        const flightDetails: FlightDetails[] = await knex('flight_details').whereIn('flight_id', flightIds);

        directFlightResults = directFlights.map(flight => ({
            ...flight,
            details: flightDetails.find(detail => detail.flight_id === flight.flight_id)
        }));
    }

    // Поиск первого сегмента транзитного рейса
    const firstLegFlights: Flight[] = await knex('flight')
        .join('airport as origin_airport', 'flight.origin_airport', 'origin_airport.airport_code')
        .join('airport as destination_airport', 'flight.destination_airport', 'destination_airport.airport_code')
        .join('city as origin_city', 'origin_airport.city_id', 'origin_city.city_id')
        .join('city as destination_city', 'destination_airport.city_id', 'destination_city.city_id')
        .where('flight.origin_airport', origin)
        .andWhere('flight.departure_at', '>=', new Date(departureDate))
        .andWhere('flight.departure_at', '<', new Date(new Date(departureDate).getTime() + 24 * 60 * 60 * 1000))
        .select(
            'flight.*',
            'origin_city.city_name as origin_city_name',
            'destination_city.city_name as destination_city_name',
            'origin_airport.airport_name as origin_airport_name',
            'destination_airport.airport_name as destination_airport_name'
        );

    let connectingFlights: { firstLeg: Flight; secondLeg: Flight }[] = [];
    for (const firstLeg of firstLegFlights) {
        // Преобразование строк в даты
        const firstLegReturnAt = new Date(firstLeg.return_at);

        // Поиск второго сегмента транзитного рейса
        const secondLegFlights: Flight[] = await knex('flight')
            .join('airport as origin_airport', 'flight.origin_airport', 'origin_airport.airport_code')
            .join('airport as destination_airport', 'flight.destination_airport', 'destination_airport.airport_code')
            .join('city as origin_city', 'origin_airport.city_id', 'origin_city.city_id')
            .join('city as destination_city', 'destination_airport.city_id', 'destination_city.city_id')
            .where('flight.destination_airport', destination)
            .andWhere('flight.departure_at', '>', knex.raw('?', [departureDate]))
            .select(
                'flight.*',
                'origin_city.city_name as origin_city_name',
                'destination_city.city_name as destination_city_name',
                'origin_airport.airport_name as origin_airport_name',
                'destination_airport.airport_name as destination_airport_name'
            );

        for (const secondLeg of secondLegFlights) {
            // Преобразование строк в даты
            const secondLegDepartureAt = new Date(secondLeg.departure_at);

            // Проверка времени стыковки (например, от 1 до 6 часов)
            const layoverTime = (secondLegDepartureAt.getTime() - firstLegReturnAt.getTime()) / (1000 * 60 * 60);
            if (layoverTime >= 1 && layoverTime <= 6) {
                connectingFlights.push({
                    firstLeg,
                    secondLeg
                });
            }
        }
    }

    let connectingFlightResults: ConnectingFlightResult[] = [];
    if (connectingFlights.length > 0) {
        // Получение деталей для всех рейсов
        const allFlightIds = connectingFlights.flatMap(conn => [conn.firstLeg.flight_id!, conn.secondLeg.flight_id!]);
        const flightDetails: FlightDetails[] = await knex('flight_details').whereIn('flight_id', allFlightIds);

        // Комбинирование деталей рейсов с информацией о рейсах
        connectingFlightResults = connectingFlights.map(conn => ({
            firstLeg: {
                ...conn.firstLeg,
                details: flightDetails.find(detail => detail.flight_id === conn.firstLeg.flight_id)
            },
            secondLeg: {
                ...conn.secondLeg,
                details: flightDetails.find(detail => detail.flight_id === conn.secondLeg.flight_id)
            }
        }));
    }

    // Объединение прямых рейсов и рейсов с пересадкой
    return {
        directFlights: directFlightResults,
        connectingFlights: connectingFlightResults
    };
}



export { createFlight, getAllFlights, getFlightById, updateFlight, deleteFlight, filterFlights };

