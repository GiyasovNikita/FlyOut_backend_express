import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('flight_details').del();

    // Inserts seed entries
    await knex('flight_details').insert([
        { flight_id: 1, price: 5000.00, currency: 'RUB', baggage: true },
        { flight_id: 2, price: 6000.00, currency: 'RUB', baggage: false },
        { flight_id: 3, price: 5500.00, currency: 'RUB', baggage: true },
        { flight_id: 4, price: 7000.00, currency: 'RUB', baggage: true },
        { flight_id: 5, price: 4500.00, currency: 'RUB', baggage: false },
        { flight_id: 6, price: 4800.00, currency: 'RUB', baggage: true },
        { flight_id: 7, price: 5300.00, currency: 'RUB', baggage: false },
        { flight_id: 8, price: 5600.00, currency: 'RUB', baggage: true },
        { flight_id: 9, price: 15000.00, currency: 'RUB', baggage: true },
        { flight_id: 10, price: 14000.00, currency: 'RUB', baggage: false },
        { flight_id: 11, price: 16000.00, currency: 'RUB', baggage: true },
        { flight_id: 12, price: 17000.00, currency: 'RUB', baggage: true },
        { flight_id: 13, price: 18000.00, currency: 'RUB', baggage: false },
    ]);
}
