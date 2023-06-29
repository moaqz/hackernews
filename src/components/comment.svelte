<script>
  import Message from "@/components/icons/message.svelte";
  import { formatDate } from "@/lib/date";
  import PanelOpen from "./icons/panel-open.svelte";
  import Spinner from "./spinner.svelte";

  /** @type {import("@/lib/types").Comment} */
  export let comment;

  async function fetchReplies() {
    const res = await fetch(
      `/comments/${comment.story_id}/replies?parentId=${comment.id}`,
    );

    const data = await res.json();
    return data;
  }

  let repliesDisplayed = false;
</script>

<div class="py-4">
  <p class="mb-1 text-zinc-50">
    {comment.author.username} - {formatDate(comment.created_at.toString())}
  </p>

  <div
    class="ml-1 pl-2 border-l-2 border-l-zinc-700 hover:border-l-yellow-500 space-y-2 transition-colors"
  >
    <pre
      class="whitespace-pre-wrap break-words font-sans text-gray-300">{comment.content}</pre>

    <div class="flex items-center gap-1">
      <a
        href="/reply?id={comment.id}&item={comment.story_id}"
        class="inline-flex items-center gap-3 px-2 py-1 rounded-md text-gray-400 hover:bg-zinc-700 hover:text-zinc-50 transition-colors"
      >
        <Message /> <span>Reply</span>
      </a>

      <button
        class="inline-flex items-center gap-3 px-2 py-1 rounded-md text-gray-400 hover:bg-zinc-700 hover:text-zinc-50 transition-colors"
        on:click={() => (repliesDisplayed = !repliesDisplayed)}
      >
        <PanelOpen /> <span>Show replies</span>
      </button>
    </div>

    <!-- Reply section -->
    {#if repliesDisplayed}
      {#await fetchReplies()}
        <div class="px-2">
          <Spinner loadingText="Fetching replies..." />
        </div>
      {:then replies}
        {#each replies as reply}
          <div>
            <p class="mb-1 text-zinc-50">
              {reply.author.username} - {formatDate(
                reply.created_at.toString(),
              )}
            </p>

            <div
              class="ml-1 pl-2 border-l-2 border-l-zinc-700 hover:border-l-yellow-500 space-y-2 transition-colors"
            >
              <pre
                class="whitespace-pre-wrap break-words font-sans text-gray-300">{reply.content}</pre>
            </div>
          </div>
        {/each}
      {:catch}
        <span>Oops. something's wrong.</span>
      {/await}
    {/if}
  </div>
</div>
