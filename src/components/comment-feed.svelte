<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Comment from "./comment.svelte";

  /** @type {import("@/lib/types").Comment[]}*/
  let comments = [];

  onMount(async () => {
    const res = await fetch(`/comments/${$page.params.itemId}`);
    comments = await res.json();
  });
</script>

<div class="mx-6 border-t border-t-brand-base-content/10">
  {#each comments as comment}
    <Comment {comment} />
  {/each}
</div>
