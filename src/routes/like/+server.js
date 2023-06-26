import { error, json } from "@sveltejs/kit";
import { db } from "@/db";
import { vote, story } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function POST({ url, locals }) {
  const { session } = await locals.auth.validateUser();

  if (session == null) {
    throw error(401, "you must be logged in to like a story");
  }

  const type = url.searchParams.get("action");
  const storyId = url.searchParams.get("storyId");

  if (type == null || storyId == null) {
    throw error(404, "missing type or storyId");
  }

  try {
    if (type === "like") {
      await db.transaction(async (tx) => {
        await tx.insert(vote).values({
          user_id: session.userId,
          story_id: Number(storyId),
        });

        await tx
          .update(story)
          .set({ score: sql`${story.score} + 1` })
          .where(eq(story.id, Number(storyId)));
      });

      return json("ok");
    }

    if (type == "dislike") {
      await db.transaction(async (tx) => {
        await tx
          .delete(vote)
          .where(
            and(
              eq(vote.story_id, Number(storyId)),
              eq(vote.user_id, session.userId),
            ),
          );

        await tx
          .update(story)
          .set({ score: sql`${story.score} - 1` })
          .where(eq(story.id, Number(storyId)));
      });

      return json("ok");
    }

    throw new Error("Invalid action type");
  } catch (err) {
    throw error(500, "Fail to add vote");
  }
}
