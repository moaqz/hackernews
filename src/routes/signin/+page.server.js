import { fail, redirect } from "@sveltejs/kit";
import { auth } from "@/lib/lucia";
import { LuciaError } from "lucia-auth";
import { validateCredentials } from "@/lib/validations";

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ locals }) => {
  const { session } = await locals.auth.validateUser();

  if (session) {
    throw redirect(302, "/");
  }
};

/** @type {import("./$types").Actions} */
export const actions = {
  default: async ({ request, locals, url }) => {
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
      const key = await auth.useKey("username", username, password);

      const session = await auth.createSession(key.userId);
      locals.auth.setSession(session);
    } catch (err) {
      if (err instanceof LuciaError) {
        if (
          err.message === "AUTH_INVALID_KEY_ID" ||
          err.message === "AUTH_INVALID_PASSWORD"
        ) {
          return fail(401, {
            invalid: true,
            message: "username or password is incorrect",
          });
        }
      }

      return fail(500);
    }

    const redirectURL = url.searchParams.get("redirect_url");
    throw redirect(303, redirectURL || "/");
  },
};
