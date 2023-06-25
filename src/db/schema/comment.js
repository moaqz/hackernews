import {
  pgTable,
  varchar,
  integer,
  timestamp,
  serial,
  foreignKey,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { story } from "./story";

export const comment = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    content: varchar("content").notNull(),
    author_id: varchar("author_id", { length: 15 })
      .notNull()
      .references(() => user.id, {
        onDelete: "set null",
      }),
    story_id: integer("story_id")
      .notNull()
      .references(() => story.id, {
        onDelete: "cascade",
      }),
    parent_id: integer("parent_id"),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parent_id],
        foreignColumns: [table.id],
      }),
    };
  },
);
