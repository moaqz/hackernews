import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const story = pgTable(
  "stories",
  {
    id: serial("id").primaryKey(),
    author_id: varchar("author_id", { length: 15 })
      .notNull()
      .references(() => user.id, {
        onDelete: "set null",
      }),
    title: varchar("title").notNull(),
    content: varchar("content").notNull(),
    url: varchar("url"),
    score: integer("score").default(0),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      titleIdx: index("story_title_idx").on(table.title),
      authorIdx: index("story_author_id_idx").on(table.author_id),
    };
  },
);
