import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("flight", (table) => {
        table.increments("flight_id").primary();
        table.string("origin_airport", 3).notNullable();
        table.string("destination_airport", 3).notNullable();
        table.string("airline_code", 2).notNullable();
        table.string("flight_number", 10).notNullable();
        table.timestamp("departure_at").notNullable();
        table.timestamp("return_at").notNullable();
        table.integer("duration").notNullable();
        table.foreign("origin_airport").references("airport.airport_code");
        table.foreign("destination_airport").references("airport.airport_code");
        table.foreign("airline_code").references("airline.airline_code");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("flight");
}
