import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "../user/account";

@Entity()
export class Rate extends BaseEntity{

    @PrimaryGeneratedColumn({name: "id"})
    private id : number;

    @Column({name: "movieId"})
    movieId : number;

    @Column({name: "rate"})
     rate : number;

    @ManyToOne(type => Account,{cascade: true})
    @JoinColumn({name: "accountId"})
    public account : Account;

    constructor(movieId: number, rate: number, account: Account) {
        super();
        this.movieId = movieId;
        this.rate = rate;
        this.account = account;
    }

}