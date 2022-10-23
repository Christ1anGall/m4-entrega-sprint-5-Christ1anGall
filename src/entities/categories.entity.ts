import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";

@Entity()
export class Categories {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany((type) => Properties, (properties) => properties.categoryid, {
    eager: true,
  })
  properties: Properties[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
