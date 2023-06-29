import { db } from "@/db";
import { comment, user } from "@/db/schema";
import { error, json } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
  const parentId = url.searchParams.get("parentId")

  if (!parentId) {
    throw error(400, {
      message: "missing parent id"
    })
  }

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
          eq(comment.parent_id, Number(parentId)),
        ),
      );

    return json(comments);
  } catch (err) {
    throw error(500);
  }
}
