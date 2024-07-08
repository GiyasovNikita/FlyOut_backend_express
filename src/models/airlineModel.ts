import knex from '../config/knex';

interface Airline {
    airline_code: string;
    airline_name: string;
}

const createAirline = async (airline: Airline) => {
    return knex('airline').insert(airline).returning('*');
};

const getAllAirlines = async () => {
    return knex('airline').select('*');
};

const getAirlineByCode = async (code: string) => {
    return knex('airline').where({airline_code: code}).first();
};

const updateAirline = async (code: string, airline: Partial<Airline>) => {
    return knex('airline').where({airline_code: code}).update(airline).returning('*');
};

const deleteAirline = async (code: string) => {
    return knex('airline').where({airline_code: code}).del().returning('*');
};

export { createAirline, getAllAirlines, getAirlineByCode, updateAirline, deleteAirline };
