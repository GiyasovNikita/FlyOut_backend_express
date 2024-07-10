import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('flight').del();

    await knex('flight').insert([
    {
        origin_airport: 'TJM',
        destination_airport: 'DME',
        airline_code: 'DP',
        flight_number: 'DP2001',
        departure_at: new Date('2024-07-21T06:00:00Z'),
        return_at: new Date('2024-07-21T10:00:00Z'),
        duration: 240,
    },
    {
        origin_airport: 'DME',
        destination_airport: 'LED',
        airline_code: 'DP',
        flight_number: 'DP2002',
        departure_at: new Date('2024-07-21T11:00:00Z'),
        return_at: new Date('2024-07-21T13:00:00Z'),
        duration: 120,
    },
    {
        origin_airport: 'TJM',
        destination_airport: 'OMS',
        airline_code: 'DP',
        flight_number: 'DP3001',
        departure_at: new Date('2024-07-22T01:00:00Z'),
        return_at: new Date('2024-07-22T04:00:00Z'),
        duration: 180,
    },
    {
        origin_airport: 'OMS',
        destination_airport: 'LED',
        airline_code: 'DP',
        flight_number: 'DP3002',
        departure_at: new Date('2024-07-22T07:00:00Z'),
        return_at: new Date('2024-07-22T11:00:00Z'),
        duration: 240,
    },
    {
        origin_airport: 'TJM',
        destination_airport: 'LED',
        airline_code: 'UT',
        flight_number: 'UT4001',
        departure_at: new Date('2024-07-22T12:00:00Z'),
        return_at: new Date('2024-07-22T16:00:00Z'),
        duration: 240,
    },
    {
        origin_airport: 'LED',
        destination_airport: 'TJM',
        airline_code: 'UT',
        flight_number: 'UT4002',
        departure_at: new Date('2024-07-24T11:00:00Z'),
        return_at: new Date('2024-07-24T15:00:00Z'),
        duration: 240,
    },
    {
        origin_airport: 'LED',
        destination_airport: 'SVO',
        airline_code: 'S7',
        flight_number: 'S75001',
        departure_at: new Date('2024-07-24T09:00:00Z'),
        return_at: new Date('2024-07-24T13:00:00Z'),
        duration: 240,
    },
    {
        origin_airport: 'TJM',
        destination_airport: 'SVO',
        airline_code: 'S7',
        flight_number: 'S75002',
        departure_at: new Date('2024-07-24T10:00:00Z'),
        return_at: new Date('2024-07-24T16:00:00Z'),
        duration: 360,
    },
    {
        origin_airport: 'SVO',
        destination_airport: 'DWC',
        airline_code: 'SU',
        flight_number: 'SU6001',
        departure_at: new Date('2024-07-24T20:00:00Z'),
        return_at: new Date('2024-07-25T01:30:00Z'),
        duration: 390,
    },
    {
        origin_airport: 'TJM',
        destination_airport: 'DXB',
        airline_code: 'SU',
        flight_number: 'SU6002',
        departure_at: new Date('2024-07-24T11:00:00Z'),
        return_at: new Date('2024-07-24T15:30:00Z'),
        duration: 280,
    }
]);
}