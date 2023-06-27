<script>
  import { enhance } from "$app/forms";
  import Alert from "@/components/alert.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

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

    <h1 class="mb-4 text-3xl font-semibold">
      {$page.params.username} | Edit Profile
    </h1>

    <div class="flex flex-col space-y-1">
      <label for="about" class="text-zinc-300">About</label>
      <textarea
        id="about"
        name="about"
        required
        minlength="1"
        maxlength="800"
        value={data.profile.about}
        class="min-h-[200px] resize-y rounded-sm border border-zinc-600 bg-zinc-700 px-2 py-1 outline-none focus:ring-2 focus:ring-zinc-500"
      />
    </div>

    <input
      type="submit"
      value={submitting ? "Updating..." : "Update"}
      disabled={submitting}
      class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors enabled:hover:bg-yellow-500 enabled:focus:bg-yellow-500 disabled:opacity-50"
    />
  </form>
</div>
