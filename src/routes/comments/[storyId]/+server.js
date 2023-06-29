import { db } from "@/db";
import { comment, user } from "@/db/schema";
import { error, json } from "@sveltejs/kit";
import { and, eq, isNull } from "drizzle-orm";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  try {
    const comments = await db
      .select({
        id: comment.id,
        content: comment.content,
        parent_id: comment.parent_id,
        created_at: comment.created_at,
        story_id: comment.story_id,
        author: {
          username: user.username,
          user_id: user.id,
        },
      })
      .from(comment)
      .innerJoin(user, eq(comment.author_id, user.id))
      .where(
        and(
          eq(comment.story_id, Number(params.storyId)),
          isNull(comment.parent_id),
        ),
      );

    return json(comments);
  } catch (err) {
    throw error(500);
  }
}
