<script>
  import { page } from "$app/stores";
</script>

<div class="flex flex-col items-center gap-3 py-8">
  {#if $page.status === 404}
    <h1 class="text-center text-3xl text-zinc-50">You must be lost.</h1>
    <a
      href="/"
      class="rounded-md bg-amber-400 px-3 py-1.5 text-black transition-colors hover:bg-amber-500"
    >
      Go home</a
    >
  {:else}
    <h1 class="text-center text-3xl text-zinc-50">
      Whoops. We weren't expecting that
    </h1>
    <p class="text-xl text-zinc-300">We're investigating the issue.</p>
  {/if}
</div>
