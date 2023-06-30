<script>
  import { page } from "$app/stores";
  import Button from "@/components/button.svelte";
</script>

<div class="flex flex-col items-center gap-3 py-8">
  {#if $page.status === 404}
    <h1 class="text-center text-3xl text-gray-300">You must be lost.</h1>
    <Button href="/" wfull={false}>Go home</Button>
  {:else}
    <h1 class="text-center text-3xl text-gray-300">
      Whoops. We weren't expecting that
    </h1>
    <p class="text-xl text-zinc-300">We're investigating the issue.</p>
  {/if}
</div>
