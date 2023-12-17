import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User extends BaseEntity{


  @PrimaryGeneratedColumn({name: "id"})
  private id: number;

  @Column({name: "firstName"})
  private firstName: string;

  @Column({name: "lastName"})
  private lastName: string;

  @Column({name: "email"})
  private email: string;


  constructor(firstName: string, lastName: string, email: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}