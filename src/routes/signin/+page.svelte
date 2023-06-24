<script>
  import { enhance } from "$app/forms";
</script>

<div class="px-3 py-12">
  <h1 class="text-3xl font-semibold text-center mb-4">Sign in</h1>
  <form method="POST" use:enhance class="flex flex-col gap-4 max-w-sm mx-auto">
    <div class="flex flex-col space-y-1">
      <label for="username" class="text-zinc-300">Username</label>
      <input
        id="username"
        name="username"
        class="bg-zinc-700 border border-zinc-600 px-2 py-1 rounded-sm outline-none focus:ring-2 focus:ring-zinc-500"
      />
    </div>

    <div class="flex flex-col space-y-1">
      <label for="password" class="text-zinc-300">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        class="bg-zinc-700 border border-zinc-600 px-2 py-1 rounded-sm outline-none focus:ring-2 focus:ring-zinc-500"
      />
    </div>

    <input
      type="submit"
      value="Continue"
      class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors hover:bg-yellow-500 focus:bg-yellow-500"
    />

    <a
      href="/signup"
      class="text-sm text-center text-zinc-300 transition-colors hover:underline hover:text-zinc-100 focus:underline focus:text-zinc-100"
      >New to Hackernews? Create account</a
    >
  </form>
</div>
