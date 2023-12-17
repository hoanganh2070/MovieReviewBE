import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from "../user/user";
import { Account } from "../user/account";
import {WatchListDto} from "../movie/watchlistdto";


//Database configuration
export const postgresConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'titbandau',
  database: 'imdb',
  entities: [User, Account,WatchListDto],
  synchronize: true,
}