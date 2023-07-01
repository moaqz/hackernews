<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Comment from "./comment.svelte";
  import Spinner from "./spinner.svelte";
  import Button from "./button.svelte";

  /** @type {import("@/lib/types").Comment[]}*/
  let comments = [];
  let loading = true;
  let currentPage = 1;
  let hasNextPage = true;
  let fetchingNextPage = false;

  async function fetchComments() {
    try {
      const res = await fetch(
        `/comments/${$page.params.itemId}?page=${currentPage}`,
      );

      const { data, hasNextPage: hasNext } = await res.json();

      comments = data;
      hasNextPage = hasNext;
      loading = false;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  async function loadMoreComments() {
    if (!hasNextPage || fetchingNextPage) return;

    currentPage++;
    fetchingNextPage = true;

    try {
      const res = await fetch(
        `/comments/${$page.params.itemId}?page=${currentPage}`,
      );

      const { data, hasNextPage: hasNext } = await res.json();
      comments = [...comments, ...data];
      hasNextPage = hasNext;
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      fetchingNextPage = false;
    }
  }

  console.log(comments);

  onMount(fetchComments);
</script>

<div class="mx-6 border-t border-t-brand-base-content/10">
  {#if loading}
    <div class="flex justify-center py-6">
      <Spinner />
    </div>
  {/if}

  {#if comments.length > 0}
    {#each comments as comment}
      <Comment {comment} />
    {/each}
  {/if}

  {#if comments.length === 0 && !hasNextPage && !loading}
    <div class="flex flex-col items-center py-6">
      <h2 class="text-xl text-gray-200">No Comments Yet</h2>
      <p class="text-gray-300">Be the first to share what you think!</p>
    </div>
  {/if}

  {#if hasNextPage && !loading}
    <div class="pb-4">
      <Button on:click={loadMoreComments} disabled={fetchingNextPage}>
        {#if fetchingNextPage}
          <Spinner />
        {:else}
          Load more
        {/if}
      </Button>
    </div>
  {/if}
</div>
