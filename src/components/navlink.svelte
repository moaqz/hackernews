<script>
  import { page } from "$app/stores";

  /** @type {string} */
  export let text;
  /** @type {string} */
  export let path;
</script>

<a
  href={path}
  class={$page.url.pathname === path
    ? "font-bold text-yellow-400"
    : "font-semibold text-zinc-300"}
>
  {text}
</a>
