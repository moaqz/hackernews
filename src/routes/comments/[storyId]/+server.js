import { db } from "@/db";
import { comment, user } from "@/db/schema";
import { error, json } from "@sveltejs/kit";
import { and, eq, isNull, sql } from "drizzle-orm";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url, setHeaders }) {
  const page = url.searchParams.get("page")
  const pageSize = 2

  try {
    const [count] = await db
      .select({ total: sql`COUNT(*)` })
      .from(comment)
      .where(and(
        eq(comment.story_id, Number(params.storyId)),
        isNull(comment.parent_id),
      ))

    const hasNextPage = Number(page) < Math.ceil(Number(count.total) / pageSize);

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
      .where(and(
        eq(comment.story_id, Number(params.storyId)),
        isNull(comment.parent_id),
      ))
      .limit(pageSize)
      .offset((Number(page) - 1) * pageSize);

    setHeaders({
      "cache-control": "max-age=60",
    })

    return json({ data: comments, hasNextPage: hasNextPage });
  } catch (err) {
    throw error(500);
  }
}
