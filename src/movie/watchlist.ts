import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "../user/account";

@Entity("watchlist")
export class WatchList extends BaseEntity{

    @PrimaryGeneratedColumn({name: "id"})
    private id : number;

    @Column({name: "movieId"})
    private movieId : number;

    @Column({name: "movieName"})
    private movieName : string;

    @Column({name: "moviePoster"})
    private moviePoster : string;

    @ManyToOne(type => Account,{cascade: true})
    @JoinColumn({name: "accountId"})
    public account : Account;

    constructor(movieId: number, movieName: string, moviePoster: string, account: Account) {
        super();
        this.movieId = movieId;
        this.movieName = movieName;
        this.moviePoster = moviePoster;
        this.account = account;
    }

}