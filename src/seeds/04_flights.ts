import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('flight').del();

    // Inserts seed entries
    await knex('flight').insert([
        {
            origin_airport: 'SVO',
            destination_airport: 'LED',
            airline_code: 'SU',
            flight_number: 'SU1001',
            departure_at: new Date('2024-07-09T08:00:00Z'),
            return_at: new Date('2024-07-09T12:00:00Z'),
            duration: 240,
        },
        {
            origin_airport: 'DME',
            destination_airport: 'SVX',
            airline_code: 'S7',
            flight_number: 'S71002',
            departure_at: new Date('2024-07-09T10:00:00Z'),
            return_at: new Date('2024-07-09T14:00:00Z'),
            duration: 240,
        },
        {
            origin_airport: 'VKO',
            destination_airport: 'OMS',
            airline_code: 'UT',
            flight_number: 'UT1003',
            departure_at: new Date('2024-07-10T06:00:00Z'),
            return_at: new Date('2024-07-10T10:00:00Z'),
            duration: 240,
        },
        {
            origin_airport: 'TJM',
            destination_airport: 'KHV',
            airline_code: 'DP',
            flight_number: 'DP1004',
            departure_at: new Date('2024-07-15T12:00:00Z'),
            return_at: new Date('2024-07-15T16:00:00Z'),
            duration: 240,
        },
        {
            origin_airport: 'PES',
            destination_airport: 'PEE',
            airline_code: 'SU',
            flight_number: 'SU1005',
            departure_at: new Date('2024-07-15T09:00:00Z'),
            return_at: new Date('2024-07-15T13:00:00Z'),
            duration: 240,
        },
        {
            origin_airport: 'TJM',
            destination_airport: 'SVO',
            airline_code: 'DP',
            flight_number: 'DP1006',
            departure_at: new Date('2024-07-15T10:00:00Z'),
            return_at: new Date('2024-07-15T14:00:00Z'),
            duration: 240,
        },
        {
            origin_airport: 'TJM',
            destination_airport: 'VKO',
            airline_code: 'UT',
            flight_number: 'UT1007',
            departure_at: new Date('2024-07-15T12:00:00Z'),
            return_at: new Date('2024-07-15T16:00:00Z'),
            duration: 240,
        },
        {
            origin_airport: 'DME',
            destination_airport: 'LED',
            airline_code: 'DP',
            flight_number: 'DP1008',
            departure_at: new Date('2024-07-15T12:00:00Z'),
            return_at: new Date('2024-07-15T16:00:00Z'),
            duration: 240,
        },

        {
            origin_airport: 'SVO',
            destination_airport: 'DXB',
            airline_code: 'EK',
            flight_number: 'EK1101',
            departure_at: new Date('2024-07-16T22:00:00Z'),
            return_at: new Date('2024-07-17T04:00:00Z'),
            duration: 360,
        },
        {
            origin_airport: 'DWC',
            destination_airport: 'DME',
            airline_code: 'SU',
            flight_number: 'SU1102',
            departure_at: new Date('2024-07-17T18:00:00Z'),
            return_at: new Date('2024-07-18T00:00:00Z'),
            duration: 360,
        },
        {
            origin_airport: 'LED',
            destination_airport: 'DCG',
            airline_code: 'S7',
            flight_number: 'S71103',
            departure_at: new Date('2024-07-18T14:00:00Z'),
            return_at: new Date('2024-07-18T20:00:00Z'),
            duration: 360,
        },
        {
            origin_airport: 'PEE',
            destination_airport: 'DXB',
            airline_code: 'EK',
            flight_number: 'EK1106',
            departure_at: new Date('2024-07-19T11:00:00Z'),
            return_at: new Date('2024-07-19T17:00:00Z'),
            duration: 360,
        },
        {
            origin_airport: 'OMS',
            destination_airport: 'DWC',
            airline_code: 'UT',
            flight_number: 'UT1107',
            departure_at: new Date('2024-07-20T10:00:00Z'),
            return_at: new Date('2024-07-20T16:00:00Z'),
            duration: 360,
        }
    ]);
}
