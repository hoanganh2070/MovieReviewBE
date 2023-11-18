import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Account } from "./account";
import { AccountRepository } from "./account.repository";

@Injectable()
export class UserService {


  private accountRepository : AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }


  async saveAccount(account: Account): Promise<Account> {
    const salt = await bcrypt.genSalt();
    account.hashPassword(await bcrypt.hash(account.getPassword(), salt));
    return this.accountRepository.save(account);
  }


}
