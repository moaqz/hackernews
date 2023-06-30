import { db } from "@/db";
import { comment, story, user } from "@/db/schema";
import { redis } from "@/lib/redis";
import { eq } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const cached = await redis.get(`comments:${params.username}`);

  if (cached) {
    return {
      comments: JSON.parse(cached),
    };
  }

  const comments = await db
    .select({
      id: comment.id,
      content: comment.content,
      story_id: comment.story_id,
      story_title: story.title,
      author: {
        id: user.id,
        username: user.username,
      },
    })
    .from(comment)
    .innerJoin(user, eq(comment.author_id, user.id))
    .innerJoin(story, eq(comment.story_id, story.id))
    .where(eq(user.username, params.username));

  if (!comments || comments.length === 0) {
    return { comments: null };
  }

  await redis.set(
    `comments:${params.username}`,
    JSON.stringify(comments),
    "EX",
    120,
  );

  return { comments };
}
