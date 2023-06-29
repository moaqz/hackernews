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
  class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors enabled:hover:bg-yellow-500 enabled:focus:bg-yellow-500 disabled:opacity-50 {wfull
    ? 'w-full'
    : 'w-fit'}"
  {href}
  {...$$restProps}
>
  <slot />
</svelte:element>
