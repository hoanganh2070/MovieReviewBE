import { Injectable } from '@nestjs/common';
import { AccountRepository } from "../user/account.repository";
import { Equal, FindOptionsWhere } from "typeorm";
import { Account } from "../user/account";
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {

  private accountRepository : AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  async authenticateAccount(username: string, password: string): Promise<boolean> {
    let account = this.accountRepository.findOne({
      where: {
        username: Equal(username)
      } as FindOptionsWhere<Account>
    }).then((account) => {
      if (account == null) return false;
      return bcrypt.compare(password, account.getPassword());
    });

    return account;



  }


}
