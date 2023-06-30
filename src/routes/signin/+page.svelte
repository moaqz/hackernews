<script>
  import { enhance } from "$app/forms";
  import Alert from "@/components/alert.svelte";
  import Button from "@/components/button.svelte";
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

    <h1 class="mb-4 text-3xl font-semibold text-gray-300">Sign in</h1>

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

    <Button disabled={submitting}>
      {#if submitting}
        Submitting...
      {:else}
        Continue
      {/if}
    </Button>

    <a
      href="/signup"
      class="text-sm transition-colors hover:text-gray-300 hover:underline focus:text-gray-300 focus:underline"
      >New to Hackernews? Create account</a
    >
  </form>
</div>
