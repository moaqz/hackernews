import { error } from '@sveltejs/kit';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const profile = await db
    .select()
    .from(user)
    .where(eq(user.username, params.username))

  if (profile) {
    return { profile: profile[0] }
  }

  throw error(404, 'user not found');
}