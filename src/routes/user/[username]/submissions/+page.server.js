import { db } from "@/db";
import { user, story } from "@/db/schema";
import { redis } from "@/lib/redis";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

/** @type {import("./$types").PageServerLoad} */
export async function load({ params }) {
  const cached = await redis.get(`submissions:${params.username}`);

  if (cached) {
    return { submissions: JSON.parse(cached) };
  }

  const userExists = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.username, params.username));

  if (!userExists || userExists.length === 0) {
    throw error(404);
  }

  const data = await db
    .select({
      id: story.id,
      title: story.title,
      url: story.url,
      created_at: story.created_at,
      score: story.score,
    })
    .from(story)
    .where(eq(story.author_id, userExists[0].id));

  if (!data || data.length === 0) {
    return { submissions: null };
  }

  const submissions = data.map((i) => ({
    ...i,
    author: {
      username: params.username,
      id: userExists[0].id,
    },
  }));

  await redis.set(
    `submissions:${params.username}`,
    JSON.stringify(submissions),
    "EX",
    120,
  );

  return {
    submissions: submissions,
  };
}
