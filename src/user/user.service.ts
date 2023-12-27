import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Account } from "./account";
import { AccountRepository } from "./account.repository";
import {User} from "./user";
import {FindOptionsWhere} from "typeorm";
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {


  private accountRepository : AccountRepository;
  private userRepository : UserRepository;

  constructor(accountRepository: AccountRepository, userRepository: UserRepository) {
    this.accountRepository = accountRepository;
    this.userRepository = userRepository;
  }


  async saveAccount(account: Account): Promise<Account> {
    const salt = await bcrypt.genSalt();
    account.hashPassword(await bcrypt.hash(account.getPassword(), salt));
    return this.accountRepository.save(account);
  }


  async getAccount(username: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: {
        username: username,
      } as FindOptionsWhere<Account>,
      relations: ["user"]
    })
        .then((account) => {
      return account;
    })
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id : id
      } as FindOptionsWhere<User>
    }).then((user) => {
      return user;
    })
  }

  async updateavatar(username: string, avatarurl: string): Promise<void> {
    const updateData = { avatarurl: avatarurl };

    await this.accountRepository.update({ username: username } as FindOptionsWhere<Account>, updateData);

  }


}
