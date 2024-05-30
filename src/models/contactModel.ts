import { InferModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  phoneNumber: text("phoneNumber"),
  email: text("email"),
  linkedId: integer("linkedId"),
  linkPrecedence: text("linkPrecedence").default("primary"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  deletedAt: timestamp("deletedAt"),
});


export type Contact = InferModel<typeof contacts>;