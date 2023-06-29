<script>
  import { enhance } from "$app/forms";
  import Alert from "@/components/alert.svelte";
  import FormGroup from "@/components/form-group.svelte";

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

      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
  >
    {#if form?.invalid}
      <Alert message={form.message} />
    {/if}

    <h1 class="mb-4 text-3xl font-semibold">Create an account</h1>

    <FormGroup
      required
      minlength="2"
      maxlength="50"
      id="username"
      value=""
      labelText="Username"
    />

    <FormGroup
      required
      minlength="8"
      maxlength="50"
      id="password"
      value=""
      type="password"
      labelText="Password"
    />

    <input
      type="submit"
      value="Continue"
      class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors hover:bg-yellow-500 focus:bg-yellow-500"
    />

    <a
      href="/signin"
      class="text-sm text-zinc-300 transition-colors hover:text-zinc-100 hover:underline focus:text-zinc-100 focus:underline"
      >Already have an account? Sign In.</a
    >
  </form>
</div>
