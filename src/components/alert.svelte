<script>
  import { fly } from "svelte/transition";
  import Warning from "./icons/warning.svelte";

  /** @type {string} */
  export let message;
</script>

<div
  class="flex items-center gap-2 rounded-lg bg-yellow-400 p-4 text-black"
  transition:fly={{ y: -4 }}
>
  <div>
    <Warning />
    <span class="sr-only">Warning icon</span>
  </div>
  <p class="text-sm font-semibold">{message}</p>
</div>
