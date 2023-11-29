import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { postgresConfig } from "./config/postgres.config";
import { ConfigModule } from "@nestjs/config";
import { MovieModule } from './movie/movie.module';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {CacheModule} from "@nestjs/cache-manager";
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [TypeOrmModule.forRoot(postgresConfig),AuthModule,ConfigModule.forRoot()
    , MovieModule, JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
      CacheModule.register(),
      CloudinaryModule
    ],
})
export class AppModule {

}
