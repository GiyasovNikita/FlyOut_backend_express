import knex from '../config/knex';

interface FlightDetails {
    flight_details_id?: number;
    flight_id: number;
    price: number;
    currency: string;
    baggage: boolean;
}

const createFlightDetails = async (flightDetails: FlightDetails) => {
    return knex('flight_details').insert(flightDetails).returning('*');
};

const getAllFlightDetails = async () => {
    return knex('flight_details').select('*');
};

const getFlightDetailsById = async (id: number) => {
    return knex('flight_details').where({flight_details_id: id}).first();
};

const updateFlightDetails = async (id: number, flightDetails: Partial<FlightDetails>) => {
    return knex('flight_details').where({flight_details_id: id}).update(flightDetails).returning('*');
};

const deleteFlightDetails = async (id: number) => {
    return knex('flight_details').where({flight_details_id: id}).del().returning('*');
};

export { createFlightDetails, getAllFlightDetails, getFlightDetailsById, updateFlightDetails, deleteFlightDetails };
