<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Alert from "@/components/alert.svelte";

  const parentId = $page.url.searchParams.get("id");
  const storyId = $page.url.searchParams.get("item");

  /** @type {import('./$types').ActionData} */
  export let form;

  let loading = false;
</script>

<div class="px-3 py-12">
  <form
    class="flex flex-col gap-3 max-w-sm mx-auto"
    method="post"
    use:enhance={() => {
      loading = true;

      return async ({ update, result }) => {
        await update();

        loading = false;

        if (result.type === "success") {
          goto(`/item/${storyId}`);
        }
      };
    }}
  >
    {#if form?.invalid}
      <Alert message={form.message} />
    {/if}

    <h1 class="mb-4 text-3xl font-semibold">Reply to</h1>

    <textarea
      id="content"
      name="content"
      placeholder="What are your thoughts?"
      required
      class="resize-y rounded-sm border border-zinc-600 bg-zinc-700 px-2 py-1 outline-none focus:ring-2 focus:ring-zinc-500"
    />

    <input type="text" value={storyId} id="storyId" name="storyId" hidden />
    <input type="text" value={parentId} id="parentId" name="parentId" hidden />

    <input
      type="submit"
      value={loading ? "Adding reply..." : "Reply"}
      disabled={loading}
      class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors enabled:hover:bg-yellow-500 enabled:focus:bg-yellow-500 disabled:opacity-50"
    />
  </form>
</div>
