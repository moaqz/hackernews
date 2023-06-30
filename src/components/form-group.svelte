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
  <label for={id} class="text-gray-400">{labelText}</label>
  <input
    class="rounded-md border border-indigo-600 bg-transparent px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    use:typeAction
    {id}
    name={id}
    bind:value
    {...$$restProps}
  />
</div>
