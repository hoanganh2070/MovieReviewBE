import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfig } from "./config/typeorm.config";
import { ConfigModule } from "@nestjs/config";
import { MovieService } from './movie/movie.service';
import { MovieController } from './movie/movie.controller';
import { MovieModule } from './movie/movie.module';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";


@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig),AuthModule,ConfigModule.forRoot()
    , MovieModule, JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
    ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class AppModule {

}
