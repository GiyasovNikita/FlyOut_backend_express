import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('airport').del();

    // Inserts seed entries
    await knex('airport').insert([
        { airport_code: 'BKA', airport_name: 'Быково', city_id: 1 },
        { airport_code: 'VKO', airport_name: 'Внуково', city_id: 1 },
        { airport_code: 'DME', airport_name: 'Домодедово', city_id: 1 },
        { airport_code: 'SVO', airport_name: 'Шереметьево', city_id: 1 },
        { airport_code: 'LED', airport_name: 'Пулково', city_id: 2 },
        { airport_code: 'TJM', airport_name: 'Рощино', city_id: 3 },
        { airport_code: 'SVX', airport_name: 'Кольцово', city_id: 4 },
        { airport_code: 'KHV', airport_name: 'Хабаровск-Новый', city_id: 5 },
        { airport_code: 'TBW', airport_name: 'Донское', city_id: 6 },
        { airport_code: 'TOX', airport_name: 'Тобольск', city_id: 7 },
        { airport_code: 'PEZ', airport_name: 'Пенза', city_id: 8 },
        { airport_code: 'PEE', airport_name: 'Большое Савино', city_id: 9 },
        { airport_code: 'PES', airport_name: 'Бесовец', city_id: 10 },
        { airport_code: 'OMS', airport_name: 'Омск-Центральный', city_id: 11 },
        { airport_code: 'DXB', airport_name: 'Дубай', city_id: 12},
        { airport_code: 'DCG', airport_name: 'Dubai Creek SPB', city_id: 12},
        { airport_code: 'DWC', airport_name: 'Аль-Мактум', city_id: 12 }
    ]);
}
