import Knex from 'knex';
import knexConfig from './src/config/knexfile';

const knex = Knex(knexConfig.development);

knex.seed.run()
    .then(() => {
        console.log('Seeding complete!');
        process.exit(0);
    })
    .catch((error: any) => {
        console.error('Error seeding database:', error);
        process.exit(1);
    });
