import { error } from "@sveltejs/kit";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redis } from "@/lib/redis";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const cached = await redis.get(`profile:${params.username}`);

  if (cached) {
    return { profile: JSON.parse(cached)[0] };
  }

  const profile = await db
    .select()
    .from(user)
    .where(eq(user.username, params.username));

  if (profile[0] == null) {
    throw error(404, "user not found");
  }

  await redis.set(
    `profile:${params.username}`,
    JSON.stringify(profile),
    "EX",
    120,
  );

  return { profile: profile[0] };
}
