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

    <h1 class="mb-4 text-3xl font-semibold">Sign in</h1>

    <FormGroup
      required
      minlength="2"
      maxlength="50"
      id="username"
      labelText="Username"
    />

    <FormGroup
      required
      minlength="8"
      maxlength="50"
      id="password"
      type="password"
      labelText="Password"
    />

    <input
      type="submit"
      value={submitting ? "Submitting..." : "Continue"}
      disabled={submitting}
      class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors enabled:hover:bg-yellow-500 enabled:focus:bg-yellow-500 disabled:opacity-50"
    />

    <a
      href="/signup"
      class="text-sm text-zinc-300 transition-colors hover:text-zinc-100 hover:underline focus:text-zinc-100 focus:underline"
      >New to Hackernews? Create account</a
    >
  </form>
</div>
