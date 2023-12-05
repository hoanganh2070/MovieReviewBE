import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from "../user/user";
import { Account } from "../user/account";


//Database configuration
export const postgresConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'titbandau',
  database: 'imdb',
  entities: [User, Account],
  synchronize: true,
}