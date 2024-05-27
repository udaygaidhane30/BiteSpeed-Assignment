// import { pgTable, serial, text, varchar, PgColumn } from "drizzle-orm/pg-core";

// export const users = pgTable("contacts", {
//   id: serial("id").primaryKey(),
//   fullName: text("full_name"),
//   phoneNumber: varchar("phoneNumber", { length: 256 }),
//   email: varchar("email", { length: 256 }),
//   linkedId: int("linkedId", {DEFA})
// });

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
  phoneNumber: varchar("phone_number", { length: 256 }),
  email: varchar("email", { length: 256 }),
  linkedId: integer("linked_id"),
  linkPrecedence: text("link_precedence").default("primary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
