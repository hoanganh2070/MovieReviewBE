import {DataSource, Repository} from "typeorm";
import {Movie} from "./movie";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MovieRepository extends Repository<Movie>{
    private datasource : DataSource;
    constructor(datasource: DataSource) {
        super(Movie,datasource.createEntityManager());
    }
}