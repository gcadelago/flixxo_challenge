import { DataSource } from 'typeorm';
import * as path from 'path';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  // port: 3306, // Acá configuraríamos el puerto, pero como estamos en local y usando XAMPP, no es necesario.
  username: process.env.DB_USER,
  password: process.env.DB_PASS || null, // Acá iría la contraseña, pero como estamos en local no es necesario.
  database: process.env.DB_NAME,
  synchronize: false, // Poner en FALSE en producción, porque actualiza la db en cada nuevo cambio.
  logging: false,
  entities: [path.join(__dirname, '/../database/models/**{.ts,.js}')],
  subscribers: [],
  migrations: [path.join(__dirname, '/../database/migrations/*{.ts, .js}')],
});
