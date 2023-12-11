import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthService} from "./auth.service";
import * as process from "process";


export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private  authService : AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey: process.env.SECRET,
        });
        this.authService = authService;

    }


    async validate({username}) {
            return username;
    }

}