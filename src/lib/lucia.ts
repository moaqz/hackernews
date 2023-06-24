import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { dev } from "$app/environment";
import { pool } from "@/db";

export const auth = lucia({
  adapter: pg(pool),
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
    };
  },
  csrfProtection: true,
});

export type Auth = typeof auth;
