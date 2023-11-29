import { Module } from '@nestjs/common';
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import {CacheModule} from "@nestjs/cache-manager";


@Module({
  imports: [CacheModule.register({
    tll: 30,
  })],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {

}
