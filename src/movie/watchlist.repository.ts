import {DataSource, Repository} from "typeorm";
import {WatchListDto} from "./watchlistdto";
import {Injectable} from "@nestjs/common";


@Injectable()
export class WatchlistRepository extends Repository<WatchListDto>{
    private datasource : DataSource;

    constructor(datasource: DataSource) {
        super(WatchListDto,datasource.createEntityManager());
    }
}