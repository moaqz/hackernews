import { fail, redirect } from "@sveltejs/kit";
import { auth } from "@/lib/lucia";
import { LuciaError } from "lucia-auth";

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

    if (username == null || password == null) {
      return fail(400, {
        invalid: true,
        message: "missing username or password",
      });
    }

    if (username.length > 50 || username.length < 2) {
      return fail(400, {
        invalid: true,
        message: "username must be between 2 and 50 characters"
      })
    }

    if (password.length > 50 || password.length < 8) {
      return fail(400, {
        invalid: true,
        message: "password must be between 8 and 50 characters",
      });
    }

    try {
      const key = await auth.useKey(
        "username",
        username.toString(),
        password.toString(),
      );

      const session = await auth.createSession(key.userId);

      locals.auth.setSession(session);
    } catch (err) {
      if (err instanceof LuciaError) {
        if (err.message === "AUTH_INVALID_KEY_ID" || err.message === "AUTH_INVALID_PASSWORD") {
          return fail(401, {
            invalid: true,
            message: "username or password is incorrect"
          })
        }
      }

      return fail(500);
    }
  },
};
