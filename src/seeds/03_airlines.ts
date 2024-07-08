import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('airline').del();

    // Inserts seed entries
    await knex('airline').insert([
        { airline_code: 'SU', airline_name: 'Аэрофлот' },
        { airline_code: 'S7', airline_name: 'S7 Airlines' },
        { airline_code: 'UT', airline_name: 'ЮТэйр' },
        { airline_code: 'DP', airline_name: 'Победа' },
        { airline_code: 'EK', airline_name: 'Emirates' }
    ]);
}
