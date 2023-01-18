import { DataSource } from 'typeorm';
import * as path from 'path';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306, // Here we would configure the port, but as we are in local and using XAMPP, it is not necessary.
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // Set to FALSE in production, because it updates the db at each new change.
  logging: false,
  entities: [path.join(__dirname, '/../database/models/**{.ts,.js}')],
  subscribers: [],
  migrations: [path.join(__dirname, '/../database/migrations/*{.ts, .js}')],
});
