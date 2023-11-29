import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-google-oauth20";
import * as process from "process";

export class GoogleStrategy extends PassportStrategy(Strategy){
   constructor() {
        super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/auth/google/redirect',
        scope: ['email', 'profile'],
        });
   }


   async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
       const {name, emails, photos} = profile;
       const user = {
           email: emails[0].value,
           firstName: name.givenName,
           lastName: name.familyName,
           picture: photos[0].value,
           accessToken,
       };
       return user;
   }
}