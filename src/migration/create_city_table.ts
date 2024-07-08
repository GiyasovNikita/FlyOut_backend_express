import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("city", (table) => {
        table.increments("city_id").primary();
        table.string("city_name", 15).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("city");
}
