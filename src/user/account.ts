import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";


@Entity()
export class Account extends BaseEntity{

  @PrimaryGeneratedColumn({name: "id"})
  private id: number;

  @Column({name: "username"})
  private username :string;

  @Column({name: "password"})
  private password : string;

  @OneToOne(type => User,{cascade: true})
  @JoinColumn()
  private user :User;

  constructor(username: string, password: string, user: User) {
    super();
    this.username = username;
    this.password = password;
    this.user = user;
  }

  hashPassword(password: string): void {
    this.password = password;
  }

  getPassword (): string {
    return this.password;
  }

  getUsername (): string {
    return this.username;
  }

}