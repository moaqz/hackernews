import { db } from "@/db";
import { comment, story, user } from "@/db/schema";
import { error, fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ params }) => {
  const itemId = Number(params.itemId);

  const item = await db
    .select({
      id: story.id,
      title: story.title,
      created_at: story.created_at,
      url: story.url,
      content: story.content,
      score: story.score,
      author: {
        username: user.username,
        user_id: user.id,
      },
    })
    .from(story)
    .innerJoin(user, eq(story.author_id, user.id))
    .where(eq(story.id, itemId));

  if (!item || item.length === 0) {
    throw error(404);
  }

  return { item: item[0] };
};

/** @type {import('./$types').Actions} */
export const actions = {
  comment: async ({ locals, request }) => {
    const session = await locals.auth.validate();

    if (!session || session.state !== "active") {
      throw error(401);
    }

    const form = await request.formData();
    const content = form.get("content");
    const storyId = form.get("storyId");

    if (!content || !storyId) {
      throw error(404);
    }

    try {
      await db.insert(comment).values({
        author_id: session.userId,
        content: content.toString(),
        story_id: Number(storyId),
      });

      return { success: true };
    } catch (error) {
      return fail(500);
    }
  },
};
