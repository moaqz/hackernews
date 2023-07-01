import { auth } from "@/lib/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "@/db";
import { story } from "@/db/schema";
import { validateStorySubmition } from "@/lib/validations";

/** @type {import("./$types").Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    if (locals.auth.storedSessionId == null) {
      throw redirect(303, "/signin");
    }

    const session = await auth.getSession(locals.auth.storedSessionId);
    if (session == null || session.userId == null) {
      throw redirect(303, "/signin");
    }

    const form = await request.formData();
    const url = String(form.get("url"));
    const title = String(form.get("title"));
    const content = String(form.get("content"));

    const validationError = validateStorySubmition({
      title,
      url,
      content,
    });

    if (validationError != null) {
      return fail(400, {
        invalid: true,
        message: validationError,
      });
    }

    let item;

    try {
      item = await db
        .insert(story)
        .values({
          author_id: session.userId,
          content: content,
          title: title,
          url: url,
        })
        .returning({ id: story.id });
    } catch (error) {
      return fail(500);
    }

    throw redirect(303, `/item/${item[0].id}`);
  },
};

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();

  if (!user) {
    throw redirect(302, "/signin?redirect_url=/submit");
  }

  return {};
};
