import { auth } from "@/lib/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "@/db";
import { story } from "@/db/schema";

/** @type {import("./$types").Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();

    const url = form.get("url");
    const title = form.get("title");
    const content = form.get("content");

    if (url == null || title == null || content == null) {
      return fail(400);
    }

    if (locals.auth.storedSessionId == null) {
      return fail(400);
    }

    const session = await auth.getSession(locals.auth.storedSessionId);

    if (session == null || session.userId == null) {
      return fail(400);
    }

    try {
      await db.insert(story).values({
        author_id: session.userId,
        content: content.toString(),
        title: title.toString(),
        url: url.toString(),
      });

      return { success: true };
    } catch (error) {
      return fail(500);
    }
  },
};

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();

  if (!user) {
    throw redirect(302, "/signin");
  }

  return {};
};
