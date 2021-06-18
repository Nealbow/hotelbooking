module.exports = {
  type: 'postgres',
  port: 5432,
  synchronize: false,
  password: 'postgres',
  username: 'postgres',
  database: 'hotelbooking',
  host: 'localhost',
  entities: ['./src/database/**/*.entity.ts'],
  seeds: ['src/database/**/*.seeder{.ts, .js}'],
  factories: ['src/database/**/*.factory{.ts, .js}'],
};
