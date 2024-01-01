import {DataSource, Repository} from "typeorm";
import {WatchList} from "./watchlist";
import {Injectable} from "@nestjs/common";


@Injectable()
export class WatchlistRepository extends Repository<WatchList>{
    private datasource : DataSource;

    constructor(datasource: DataSource) {
        super(WatchList,datasource.createEntityManager());
    }
}