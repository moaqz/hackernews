import { redirect } from "@sveltejs/kit";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ locals, params }) => {
  const { session } = await locals.auth.validateUser();

  if (!session || session.state !== "active") {
    throw redirect(302, "/signin");
  }

  const profile = await db
    .select({
      about: user.about,
    })
    .from(user)
    .where(eq(user.username, params.username));

  return { profile: profile[0] };
};

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ locals, request }) => {
    const session = await locals.auth.validate();

    if (!session || session.state !== "active") {
      throw redirect(303, "/login");
    }

    const form = await request.formData();
    const about = form.get("about");

    if (about != null && about.length > 800) {
      return fail(400, {
        invalid: true,
        message: "about can not exceed 800 characters",
      });
    }

    try {
      await db
        .update(user)
        .set({
          about: about?.toString(),
        })
        .where(eq(user.id, session.userId));

      return { success: true };
    } catch (error) {
      return fail(500);
    }
  },
};
