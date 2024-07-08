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

const filterFlights = async (origin: string, destination: string, departureDate: string, returnDate?: string) => {
    console.log('Filtering flights with:', { origin, destination, departureDate, returnDate });

    let query = knex('flight')
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
            'origin_airport.airport_name as origin_airport_name',
            'destination_airport.airport_name as destination_airport_name',
            'origin_city.city_name as origin_city_name',
            'destination_city.city_name as destination_city_name'
        );

    if (returnDate) {
        query = query.andWhere('flight.return_at', '>=', new Date(returnDate))
            .andWhere('flight.return_at', '<', new Date(new Date(returnDate).getTime() + 24 * 60 * 60 * 1000));
    }

    const flights = await query;

    const flightIds = flights.map(flight => flight.flight_id);
    console.log('Flight IDs:', flightIds);

    if (flightIds.length === 0) {
        return [];
    }

    const flightDetails = await knex('flight_details').whereIn('flight_id', flightIds);

    return flights.map(flight => ({
        ...flight,
        details: flightDetails.find(detail => detail.flight_id === flight.flight_id)
    }));
};


export { createFlight, getAllFlights, getFlightById, updateFlight, deleteFlight, filterFlights };

