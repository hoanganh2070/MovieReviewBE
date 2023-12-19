import {DataSource, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Rate} from "./rate";


@Injectable()
export class RateRepository extends Repository<Rate>{
    private datasource : DataSource;

    constructor(datasource: DataSource) {
        super(Rate,datasource.createEntityManager());
    }
}