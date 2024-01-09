import { Injectable } from '@nestjs/common';
import { AccountRepository } from "../user/account.repository";
import { Equal, FindOptionsWhere } from "typeorm";
import { Account } from "../user/account";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import * as process  from "process";


@Injectable()
export class AuthService {

  private accountRepository : AccountRepository;
  private jwtService : JwtService;

  constructor(accountRepository: AccountRepository, jwtService: JwtService) {
    this.accountRepository = accountRepository;
    this.jwtService = jwtService;
  }

  async authenticateAccount(username: string, password: string): Promise<any> {
    let account = this.accountRepository.findOne({
      where: {
        username: Equal(username)
      } as FindOptionsWhere<Account>
    }).then((account) => {
      if (account == null) return false;
      if (bcrypt.compare(password, account.getPassword())){
         return account;
      };
      return false;
    });
    return account;
  }

  createToken(username: string) {
    const payload = { username };
    return this.jwtService.sign(payload , {expiresIn: '86400s', secret: process.env.SECRET});
  }




}
