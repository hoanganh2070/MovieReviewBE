import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { User } from "../user/user";
import { Account } from "../user/account";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";

@Controller("/api/auth")
export class AuthController {

  private authService : AuthService;
  private userService : UserService;
  private jwtService : JwtService;


  constructor(authService: AuthService, userService: UserService, jwtService: JwtService) {
    this.authService = authService;
    this.userService = userService;
    this.jwtService = jwtService;

  }




  @Post('/signup')
  async createAccount(@Body() body : object) : Promise<string> {
    let user : User = new User(body['user']['firstname'],
      body['user']['lastname'],body['user']['email']);
    let account : Account = new Account(body['account']['username'],
      body['account']['password'],user);
    await this.userService.saveAccount(account);
    return JSON.parse('{"message":"account created successfully"}');
  }

  @Post('/signin')
  async authenticateAccount(@Body() body: object): Promise<string> {
    return await this.authService.authenticateAccount(body['username'], body['password']).then((authenticated) => {
      if (authenticated) {
        const payload  = String(body['username']);
        const accessToken =  this.jwtService.sign(payload,{ secret: process.env.SECRET })
        return JSON.parse('{"authenticated":true,"accessToken":"' + accessToken + '"}')
      } else {
        console.log('Unauthenticated');
        return JSON.parse('{"authenticated":false}')
      }
    });
  }







}
