import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./address.entity";
import { Categories } from "./categories.entity";
import { Schedules_users_properties } from "./schedules_users_properties";

@Entity()
export class Properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2 })
  value: Number;

  @Column("integer")
  size: Number;

  @Column({ type: "date" })
  createdAt: Date;

  @Column({ type: "date" })
  updatedAt: Date;

  @OneToOne((type) => Address, { eager: true })
  @JoinColumn()
  addressid: Address;

  @ManyToOne((type) => Categories, (categoryid) => categoryid.properties)
  categoryid: Categories;

  @OneToMany(
    (type) => Schedules_users_properties,
    (schedules) => schedules.propertyid,
    {
      eager: true,
    }
  )
  schedules: Schedules_users_properties[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
