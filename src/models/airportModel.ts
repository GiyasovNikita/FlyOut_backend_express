import knex from '../config/knex';

interface Airport {
    airport_code: string;
    airport_name: string;
    city_id?: number;
    city_name?: string;
}

const createAirport = async (airport: Airport) => {
    return knex('airport').insert(airport).returning('*');
};

const getAllAirports = async (): Promise<Airport[]> => {
    return knex('airport')
        .join('city', 'airport.city_id', '=', 'city.city_id')
        .select(
            'airport.airport_code',
            'airport.airport_name',
            'airport.city_id',
            'city.city_name as city_name'
        );
};

const getAirportByCode = async (code: string) => {
    return knex('airport').where({airport_code: code}).first();
};

const updateAirport = async (code: string, airport: Partial<Airport>) => {
    return knex('airport').where({airport_code: code}).update(airport).returning('*');
};

const deleteAirport = async (code: string) => {
    return knex('airport').where({airport_code: code}).del().returning('*');
};

export { createAirport, getAllAirports, getAirportByCode, updateAirport, deleteAirport };
