import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('flight_details').del();

await knex('flight_details').insert([
    { flight_id: 14, price: 5000.00, currency: 'RUB', baggage: true },
    { flight_id: 15, price: 6000.00, currency: 'RUB', baggage: true },
    { flight_id: 16, price: 5500.00, currency: 'RUB', baggage: true },
    { flight_id: 17, price: 7000.00, currency: 'RUB', baggage: true },
    { flight_id: 18, price: 4500.00, currency: 'RUB', baggage: false },
    { flight_id: 19, price: 4800.00, currency: 'RUB', baggage: true },
    { flight_id: 20, price: 5300.00, currency: 'RUB', baggage: false },
    { flight_id: 21, price: 5600.00, currency: 'RUB', baggage: true },
    { flight_id: 22, price: 15000.00, currency: 'RUB', baggage: true },
    { flight_id: 23, price: 14000.00, currency: 'RUB', baggage: false }
]);
}