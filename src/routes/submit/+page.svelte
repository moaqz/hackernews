<script>
  import { enhance } from "$app/forms";
  import Button from "@/components/button.svelte";
  import FormGroup from "@/components/form-group.svelte";
</script>

<div class="px-3 py-12">
  <form method="POST" class="mx-auto flex max-w-sm flex-col gap-4" use:enhance>
    <h1 class="mb-4 text-3xl font-semibold">Submit story</h1>
    <FormGroup
      required
      minlength="2"
      maxlength="150"
      id="title"
      labelText="Title"
    />

    <FormGroup id="url" labelText="Url" />

    <div class="flex flex-col space-y-1">
      <label for="content" class="text-zinc-300">Content</label>
      <textarea
        id="content"
        name="content"
        required
        minlength="1"
        maxlength="250"
        class="resize-y rounded-sm border border-zinc-600 bg-zinc-700 px-2 py-1 outline-none focus:ring-2 focus:ring-zinc-500"
      />
    </div>

    <Button>Submit</Button>

    <p class="text-sm text-zinc-300">
      If there is no url, text will appear at the top of the thread.
    </p>
  </form>
</div>
