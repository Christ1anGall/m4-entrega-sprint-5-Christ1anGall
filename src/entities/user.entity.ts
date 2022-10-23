import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Schedules_users_properties } from "./schedules_users_properties";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  isAdm: boolean;

  @Column()
  isActive: boolean;

  @Column({ type: "date" })
  createdAt: Date;

  @Column({ type: "date" })
  updatedAt: Date;

  @OneToMany(
    (type) => Schedules_users_properties,
    (schedules) => schedules.user
  )
  schedules: Schedules_users_properties[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
