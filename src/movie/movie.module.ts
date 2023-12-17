import { Module } from '@nestjs/common';
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import {CacheModule} from "@nestjs/cache-manager";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../auth/jwt.strategy";
import {WatchlistRepository} from "./watchlist.repository";
import {UserService} from "../user/user.service";
import {AccountRepository} from "../user/account.repository";
import {UserRepository} from "../user/user.repository";


@Module({
  imports: [CacheModule.register({ tll: 30,}),
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt',session: false})],
  controllers: [MovieController],
  providers: [MovieService,JwtStrategy,WatchlistRepository,UserService,
    AccountRepository,UserRepository],
})
export class MovieModule {

}
