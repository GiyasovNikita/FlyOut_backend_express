import knex from '../config/knex';

interface City {
    city_id?: number;
    city_name: string;
}

const createCity = async (city: City) => {
    return knex('city').insert(city).returning('*');
};

const getAllCities = async () => {
    return knex('city').select('*');
};

const getCityById = async (id: number) => {
    return knex('city').where({city_id: id}).first();
};

const updateCity = async (id: number, city: Partial<City>) => {
    return knex('city').where({city_id: id}).update(city).returning('*');
};

const deleteCity = async (id: number) => {
    return knex('city').where({city_id: id}).del().returning('*');
};

export { createCity, getAllCities, getCityById, updateCity, deleteCity };
