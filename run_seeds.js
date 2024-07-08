"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./src/config/knexfile"));
const knex = (0, knex_1.default)(knexfile_1.default.development);
knex.seed.run()
    .then(() => {
    console.log('Seeding complete!');
    process.exit(0);
})
    .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
});
