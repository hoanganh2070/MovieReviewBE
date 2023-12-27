import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import {CloudinaryProvider} from "./cloudinary.provider";
import {CloudinaryService} from "./cloudinary.service";
import {UserService} from "../user/user.service";
import {AccountRepository} from "../user/account.repository";
import {UserRepository} from "../user/user.repository";
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider,CloudinaryService,UserService
    ,AccountRepository,UserRepository,JwtStrategy],
})
export class CloudinaryModule {}
