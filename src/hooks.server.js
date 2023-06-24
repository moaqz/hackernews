import { auth } from "@/lib/lucia";

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);

  return await resolve(event);
};
