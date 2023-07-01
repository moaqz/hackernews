import { fail, redirect } from "@sveltejs/kit";
import { auth } from "@/lib/lucia";
import { validateCredentials } from "@/lib/validations";

/** @type {import("./$types").Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const username = String(form.get("username"));
    const password = String(form.get("password"));

    const validationErrors = validateCredentials(username, password);
    if (validationErrors) {
      return fail(400, {
        invalid: true,
        message: validationErrors,
      });
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
    } catch (err) {
      if (err instanceof Error) {
        // PostgreSQL Error code 23505 is throw when a key value violates an unique constraint
        // @ts-ignore
        if (err.code === "23505") {
          return fail(409, {
            invalid: true,
            message: `Username '${username}' already exists.`,
          });
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
