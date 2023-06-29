<script>
  import { fly } from "svelte/transition";
  import Warning from "./icons/warning.svelte";

  /** @type {string} */
  export let message;
</script>

<div
  class="flex items-center gap-2 rounded-lg bg-zinc-700 p-4 text-zinc-300"
  transition:fly={{ y: -4 }}
>
  <div
    class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-700 text-orange-200"
  >
    <Warning />
    <span class="sr-only">Warning icon</span>
  </div>
  <p class="text-sm capitalize">{message}</p>
</div>
