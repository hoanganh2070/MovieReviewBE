import {DataSource, Repository} from "typeorm";
import {User} from "./user";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {

    private datasource: DataSource;
    constructor(datasource: DataSource) {
        super(User, datasource.createEntityManager());
    }

}