import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("airport", (table) => {
        table.string("airport_code", 3).primary();
        table.string("airport_name", 255).notNullable();
        table.integer("city_id").unsigned();
        table.foreign("city_id").references("city.city_id");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("airport");
}
