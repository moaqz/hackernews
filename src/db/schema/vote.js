import { pgTable, varchar, primaryKey, serial } from "drizzle-orm/pg-core";
import { user } from "./user";
import { story } from "./story";

export const vote = pgTable(
  "votes",
  {
    user_id: varchar("user_id", { length: 15 })
      .notNull()
      .references(() => user.id, {
        onDelete: "set null",
      }),
    story_id: serial("story_id")
      .notNull()
      .references(() => story.id),
  },
  (table) => {
    return {
      pk: primaryKey(table.story_id, table.user_id),
    };
  },
);
