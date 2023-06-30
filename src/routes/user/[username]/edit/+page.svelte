<script>
  import { enhance } from "$app/forms";
  import Alert from "@/components/alert.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Button from "@/components/button.svelte";

  /** @type {import("./$types").PageData}*/
  export let data;

  let submitting = false;
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div class="px-3 py-12">
  <form
    method="POST"
    class="mx-auto flex max-w-sm flex-col gap-4"
    use:enhance={() => {
      submitting = true;

      return async ({ update, result }) => {
        await update();
        submitting = false;

        if (result.type === "success") {
          goto(`/user/${$page.params.username}`);
          return;
        }
      };
    }}
  >
    {#if form?.invalid}
      <Alert message={form.message} />
    {/if}

    <h1 class="mb-4 text-3xl font-semibold text-gray-100">
      {$page.params.username} | Edit Profile
    </h1>

    <div class="flex flex-col space-y-1">
      <label for="about" class="text-zinc-400">About</label>
      <textarea
        id="about"
        name="about"
        required
        minlength="1"
        maxlength="800"
        value={data.profile.about}
        class="resize-y min-h-[400px] rounded-md border border-indigo-600 bg-transparent px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <Button disabled={submitting}>
      {#if submitting}
        Updating...
      {:else}
        Update
      {/if}
    </Button>
  </form>
</div>
