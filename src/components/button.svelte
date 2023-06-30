<script>
  /** @type {'button' | 'submit' | 'reset'} */
  export let type = "submit";
  export let wfull = true;

  /** @type {string | undefined }*/
  export let href = undefined;
</script>

<svelte:element
  this={href ? "a" : "button"}
  on:click
  type={href ? undefined : type}
  role={href ? "button" : undefined}
  class="rounded-md bg-indigo-600 px-3 py-1.5 text-white transition-colors enabled:hover:bg-indigo-500 enabled:focus:bg-indigo-500 disabled:opacity-50 {wfull
    ? 'w-full'
    : 'w-fit'}"
  {href}
  {...$$restProps}
>
  <slot />
</svelte:element>
