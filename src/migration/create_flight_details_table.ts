import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("flight_details", (table) => {
        table.increments("flight_details_id").primary();
        table.integer("flight_id").unsigned().notNullable();
        table.decimal("price", 10, 2).notNullable();
        table.string("currency", 3).notNullable();
        table.boolean("baggage").notNullable();
        table.foreign("flight_id").references("flight.flight_id");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("flight_details");
}
