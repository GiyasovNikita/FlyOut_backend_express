import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("airline", (table) => {
        table.string("airline_code", 2).primary();
        table.string("airline_name", 255).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("airline");
}
