import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user";
import {WatchListDto} from "../movie/watchlistdto";


@Entity()
export class Account extends BaseEntity{

  @PrimaryGeneratedColumn({name: "id"})
  public id: number;

  @Column({name: "username"})
  private readonly username :string;

  @Column({name: "password"})
  private password : string;

  @Column({name: "avatarurl",nullable: true})
  private avatarurl : string

  @OneToOne(type => User,{cascade: true})
  @JoinColumn()
  private user :User;

  @OneToMany(type => WatchListDto,watchlist => watchlist.account)
  private watchlist : Array<WatchListDto>;

  constructor(username: string, password: string, user: User) {
    super();
    this.username = username;
    this.password = password;
    this.user = user;
  }

  hashPassword(password: string): void {
    this.password = password;
  }

  getId() : number{
    return this.id;
  }

  getPassword (): string {
    return this.password;
  }

  getUsername (): string {
    return this.username;
  }

  setUser(user : User){
    this.user = user;
  }


}