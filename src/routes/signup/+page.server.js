import { fail, redirect } from "@sveltejs/kit";
import { auth } from "@/lib/lucia";

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
      const user = await auth.createUser({
        primaryKey: {
          providerId: "username",
          providerUserId: username.toString(),
          password: password.toString(),
        },
        attributes: {
          username: username.toString(),
        },
      });
      const session = await auth.createSession(user.userId);
      locals.auth.setSession(session);
    } catch (err) {
      if (err instanceof Error) {
        // PostgreSQL Error code 23505 is throw when a key value violates an unique constraint
        // @ts-ignore
        if (err.code === "23505") {
          return fail(409, {
            invalid: true,
            message: `Username '${username}' already exists.`
          })
        }
      }

      return fail(500);
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
