import { fail, redirect } from "@sveltejs/kit";
import { auth } from "@/lib/lucia";

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
      const user = await auth.createUser({
        primaryKey: {
          providerId: "username",
          providerUserId: username,
          password: password,
        },
        attributes: {
          username: username,
        },
      });
      const session = await auth.createSession(user.userId);
      locals.auth.setSession(session);
    } catch {
      return fail(400);
    }
  },
};

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ locals }) => {
  const { user } = await locals.auth.validateUser();

  if (user) {
    throw redirect(302, "/");
  }

  return {};
};
