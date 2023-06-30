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
    ? "font-semibold text-white"
    : "font-semibold text-gray-400 hover:text-white hover:transition-colors"}
>
  {text}
</a>
