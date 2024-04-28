import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

export const dbdatasource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration',
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
