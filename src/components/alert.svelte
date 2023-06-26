<script>
  import { fly } from "svelte/transition";

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
    <svg
      aria-hidden="true"
      class="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      /></svg
    >
    <span class="sr-only">Warning icon</span>
  </div>
  <p class="text-sm capitalize">{message}</p>
</div>
