<script>
  /** @type {string} */
  export let id;
  /** @type {string} */
  export let labelText;
  /** @type {string} */
  export let value = "";
  /** @type {"text" | "email" | "password"} */
  export let type = "text";

  function typeAction(/** @type {HTMLInputElement} */ node) {
    node.type = type;
  }
</script>

<div class="flex flex-col space-y-1">
  <label for={id} class="text-zinc-300">{labelText}</label>
  <input
    class="rounded rounded-sm border border-zinc-600 bg-zinc-700 px-2 py-1 outline-none focus:ring-2 focus:ring-zinc-500"
    use:typeAction
    {id}
    name={id}
    bind:value
    {...$$restProps}
  />
</div>
