import { Column, PrimaryColumn, ManyToOne, Timestamp, Entity } from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity()
export class Schedules_users_properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => User, (user) => user.schedules, { eager: true })
  user: User;

  @ManyToOne(() => Properties, (properties) => properties.schedules)
  propertyid: Properties;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
