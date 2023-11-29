import {Body, Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { User } from "../user/user";
import { Account } from "../user/account";
import {AuthGuard} from "@nestjs/passport";



@Controller("/api/auth")
export class AuthController {

  private authService : AuthService;
  private userService : UserService;


  constructor(authService: AuthService, userService: UserService) {
    this.authService = authService;
    this.userService = userService;


  }
  //Sign up
  @Post('/signup')
  async createAccount(@Body() body : object) : Promise<string> {
    let user : User = new User(body['user']['firstname'],
      body['user']['lastname'],body['user']['email']);
    let account : Account = new Account(body['account']['username'],
      body['account']['password'],user);
    await this.userService.saveAccount(account);
    return JSON.parse('{"message":"account created successfully"}');
  }

  //Sign in
  @Post('/signin')
  async authenticateAccount(@Body() body: object): Promise<string> {
    return await this.authService.authenticateAccount(body['username'], body['password']).then((authenticated) => {
      if (authenticated) {
        const payload  = String(body['username']);
        const accessToken =  this.authService.createToken(payload);
        return JSON.parse('{"authenticated":true,"accessToken":"' + accessToken + '"}')
      } else {
        console.log('Unauthenticated');
        return JSON.parse('{"authenticated":false}')
      }
    });
  }

  //Get user profile with jwttoken
  @UseGuards(AuthGuard('jwt'))
  @Get("/profile")
  async getUser(@Req() req : any) : Promise<Account>{
      console.log("authenticated");
      let user = await this.userService.getAccount(req.user);
      user.setUser(await this.userService.getUser(user.getId()));
      return user;
  }

  //Google login
  @Get("/google/redirect")
  @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Res() res : any,@Req() req : any) : Promise<void> {
       const username = req.user['email'];
       const user = await this.userService.getAccount(username);
       let token = this.authService.createToken(username);
       if(!user){
            let user : User = new User(req.user['firstName'],
            req.user['lastName'],req.user['email']);
            let account : Account = new Account(username,
            req.user['accessToken'],user);
            await this.userService.saveAccount(account);
       }
       res.redirect(`http://localhost:4869/?token=${token}`);
  }
  //Google login
  @Get("/google/login")
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req : any) : Promise<void> {}


  //Facebook login
  @Get("/facebook/login")
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req : any) : Promise<void> {}

  //Facebook login
  @Get("/facebook/redirect")
  @UseGuards(AuthGuard('facebook'))
    async facebookAuthRedirect(@Res() res: any,@Req() req : any) : Promise<object> {
      // res.redirect(`http://localhost:4869/?token=${req.user.accessToken}`);
      return req.user;
    }


}
