import { pgTable, varchar, primaryKey, serial } from "drizzle-orm/pg-core";
import { user } from "./user";
import { story } from "./story";
import { comment } from "./comment";

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

export const commentVote = pgTable(
  "comment_votes",
  {
    user_id: varchar("user_id", { length: 15 })
      .notNull()
      .references(() => user.id, {
        onDelete: "set null",
      }),
    comment_id: serial("comment_id")
      .notNull()
      .references(() => comment.id),
  },
  (table) => {
    return {
      pk: primaryKey(table.comment_id, table.user_id),
    };
  },
);
