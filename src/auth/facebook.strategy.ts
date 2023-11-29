import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-facebook";
import * as process from "process";

export class FacebookStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/api/auth/facebook/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        console.log(profile);
        return profile;
    }

}