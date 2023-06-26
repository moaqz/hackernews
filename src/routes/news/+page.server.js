import { db } from "@/db";
import { story, user, vote } from "@/db/schema";
import { eq, and } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
  const { session } = await locals.auth.validateUser();

  const page = Number(url.searchParams.get("p")) || 1;
  const offset = (page - 1) * 10;

  if (session == null) {
    const stories = await db
      .select({
        id: story.id,
        title: story.title,
        content: story.content,
        url: story.url,
        score: story.score,
        created_at: story.created_at,
        author: user.username,
      })
      .from(story)
      .innerJoin(user, eq(story.author_id, user.id))
      .limit(10)
      .offset(offset);

    return {
      stories,
      page,
    };
  }

  const stories = await db
    .select({
      id: story.id,
      title: story.title,
      content: story.content,
      url: story.url,
      score: story.score,
      created_at: story.created_at,
      author: user.username,
      votes: {
        user_id: vote.user_id,
        story_id: vote.story_id,
      },
    })
    .from(story)
    .innerJoin(user, eq(story.author_id, user.id))
    .leftJoin(
      vote,
      and(eq(story.id, vote.story_id), eq(vote.user_id, session.userId)),
    )
    .limit(10)
    .offset(offset);

  return { stories, page };
}
