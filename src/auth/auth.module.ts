import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user";
import { Account } from "../user/account";
import { AccountRepository } from "../user/account.repository";
import { MovieService } from "../movie/movie.service";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([User,Account]),ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService,UserService,AccountRepository,
    MovieService,JwtService]
})
export class AuthModule {}
