import { Account } from "./account";
import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountRepository extends Repository<Account>{

  private datasource : DataSource;

  constructor(datasource: DataSource) {
   super(Account,datasource.createEntityManager());
  }

}