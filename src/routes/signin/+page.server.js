import { fail, redirect } from "@sveltejs/kit";
import { auth } from "@/lib/lucia";

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ locals }) => {
  const { session } = await locals.auth.validateUser();

  if (session) {
    throw redirect(302, "/");
  }
};

/** @type {import("./$types").Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    if (typeof username !== "string" || typeof password !== "string") {
      return fail(400);
    }

    try {
      const key = await auth.useKey("username", username, password);
      const session = await auth.createSession(key.userId);

      locals.auth.setSession(session);
    } catch {
      return fail(400);
    }
  },
};
