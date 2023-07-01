## Getting Started

Follow the below steps to run the app locally:

1. Clone the repository by running `git clone git@github.com:moaqz/hackernews.git`.

2. Copy the `.env.example` file to `.env` by running `cp .env.example .env` and update the credentials in the `.env` file.

3. Install the dependencies by running `pnpm install`.

4. Generate a migration with `pnpm db:generate`. This creates a new folder called `migrations` which contains the SQL queries to create the database tables.

5. Push the migration with `pnpm db:up`. If this fails (or nothing happens) and your database isn't updated with all the tables, run the SQL queries that were generated in the `migrations` folder from the previous step manually.

6. If you are not using the default port to run a Redis database, go to the `src/lib/redis.js` file and uncomment the section of code that includes the environment variable.

7. Run the development server by running `pnpm dev`.

Open http://localhost:5173/ with your browser to see the result.

## Built With

- [SvelteKit](https://kit.svelte.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [LuciaAuth](https://lucia-auth.com/?sveltekit)
- [TailwindCSS](https://tailwindcss.com/)
- [Redis](https://redis.io/)