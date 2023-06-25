import {
  pgTable,
  bigint,
  varchar,
  boolean,
  integer,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("auth_user", {
  id: varchar("id", { length: 15 }).primaryKey(),
  username: varchar("username", { length: 40 }).notNull(),
  about: varchar("about"),
  karma: integer("karma").default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
}, (table) => {
  return {
    usernameIdx: uniqueIndex("username_idx").on(table.username)
  }
});

export const session = pgTable("auth_session", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
});

export const key = pgTable("auth_key", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
  primaryKey: boolean("primary_key").notNull(),
  hashedPassword: varchar("hashed_password", { length: 255 }),
  expires: bigint("expires", { mode: "number" }),
});
