import { db } from '@/db/index.js';
import { comment } from '@/db/schema/comment.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const session = await locals.auth.validate()

  if (!session || session.state !== "active") {
    throw redirect(307, "/signin")
  }

  return {}
}

export const actions = {
  default: async ({ request, locals }) => {
    const { session } = await locals.auth.validateUser()

    if (!session || session.state !== "active") {
      throw redirect(303, "/signin")
    }

    const { content, storyId, parentId } = Object.fromEntries(await request.formData())

    if (content == null || storyId == null || parentId == null) {
      return fail(400, {
        invalid: true,
        message: "missing content, storyId or parentId",
      })
    }

    try {
      await db.insert(comment).values({
        content: content.toString(),
        story_id: Number(storyId),
        parent_id: Number(parentId),
        author_id: session.userId,
      })

      return { success: true }
    } catch (error) {
      return fail(500)
    }
  }
};