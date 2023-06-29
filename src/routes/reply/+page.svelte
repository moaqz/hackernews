<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Alert from "@/components/alert.svelte";
  import Button from "@/components/button.svelte";

  const parentId = $page.url.searchParams.get("id");
  const storyId = $page.url.searchParams.get("item");

  /** @type {import('./$types').ActionData} */
  export let form;

  let loading = false;
</script>

<div class="px-3 py-12">
  <form
    class="mx-auto flex max-w-sm flex-col gap-3"
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

    <Button disabled={loading}>
      {#if loading}
        Adding reply...
      {:else}
        Reply
      {/if}
    </Button>
  </form>
</div>
