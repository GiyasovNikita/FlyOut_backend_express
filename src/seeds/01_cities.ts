import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('city').del();

    // Inserts seed entries
    await knex('city').insert([
        { city_name: 'Москва' },
        { city_name: 'Санкт-Петербург' },
        { city_name: 'Тюмень' },
        { city_name: 'Екатеринбург' },
        { city_name: 'Хабаровск' },
        { city_name: 'Тамбов' },
        { city_name: 'Тобольск' },
        { city_name: 'Пенза' },
        { city_name: 'Пермь' },
        { city_name: 'Петрозаводск' },
        { city_name: 'Омск' },
        { city_name: 'Дубай' }
    ]);
}
