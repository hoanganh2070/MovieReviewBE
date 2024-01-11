import {Body, Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {Account} from "../user/account";
import {AuthGuard} from "@nestjs/passport";
import {ApiTags} from "@nestjs/swagger";


@Controller("/api/auth")
@ApiTags('Auth')
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
    let user : User = new User(body['user']['firstName'],
      body['user']['lastName'],body['user']['email']);
    console.log(user);
    let account : Account = new Account(body['account']['username'],
      body['account']['password'],null,user);
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
        return {authenticated: true, accessToken: accessToken,avatar:authenticated['avatarurl']};
      }
      else {
        console.log('Unauthenticated');
        return JSON.parse('{"authenticated":false}')
      }
    });
  }

  //Get user profile with jwttoken
  @UseGuards(AuthGuard('jwt'))
  @Get("/profile")
  async getUser(@Req() req : any) : Promise<Account>{
      return await this.userService.getAccount(req.user);
  }

  //Google login
  @Get("/google/redirect")
  @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Res() res : any,@Req() req : any) : Promise<void> {
       const email = req.user['email'].toString();
       const username = email.substring(0,email.indexOf('@'));
       const user = await this.userService.getAccount(username);
       let token = this.authService.createToken(username);
       if(!user){
            let user : User = new User(req.user['firstName'],
            req.user['lastName'],req.user['email']);
            let account : Account = new Account(username,
            req.user['accessToken'],req.user['picture'],user);
            await this.userService.saveAccount(account);
            res.cookie('token',token);
            const encodedImageUrl = btoa(req.user['picture']);
            res.cookie('avatar',encodedImageUrl);
            res.redirect(`http://localhost:4869`);
            return ;

       }
         else{
           res.cookie('token',token);
           const encodedImageUrl = btoa(user.avatarurl.toString());
           res.cookie('avatar',encodedImageUrl);
           res.redirect(`http://localhost:4869`);
           return ;
         }
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
      res.redirect(`http://localhost:4869/?token=${req.user.accessToken}`);
      return req.user;
    }
}
