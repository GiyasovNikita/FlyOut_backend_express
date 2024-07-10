import Knex from 'knex';
import knexConfig from './src/config/knexfile';

// Получение имени сида из аргументов командной строки
const seedName = process.argv[2];

const knex = Knex(knexConfig.development);

// Запуск конкретного сида, если имя сида передано
const seedRun = seedName ? knex.seed.run({ specific: seedName }) : knex.seed.run();

seedRun
    .then(() => {
        console.log('Seeding complete!');
        process.exit(0);
    })
    .catch((error: any) => {
        console.error('Error seeding database:', error);
        process.exit(1);
    });
