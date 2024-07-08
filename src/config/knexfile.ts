import { Knex } from "knex";

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: "pg",
        connection: {
            host: "localhost",
            user: "postgres",
            password: "1111",
            database: "flyout_db"
        },
        migrations: {
            directory: "./src/migration"
        },
        seeds: {
            directory: './src/seeds'
        }
    }
};

export default knexConfig;
