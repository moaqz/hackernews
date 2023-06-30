<script>
  import { formatDate } from "@/lib/date";
  import ArrowUp from "./icons/arrow-up.svelte";

  /** @type {import("@/lib/types").Story} */
  export let story;

  /** @type {import("lucia-auth").User | null}*/
  export let session;

  let hasVoted = false;

  if (story.votes != null) {
    hasVoted = true;
  }

  const handleVote = async (/** @type {'like' | 'dislike'} */ type) => {
    if (session == null || session.userId == null) {
      return;
    }

    const res = await fetch(`/like?storyId=${story.id}&action=${type}`, {
      method: "POST",
    });

    if (!res.ok) {
      return;
    }

    if (type === "like") {
      hasVoted = true;
      story.score = story.score + 1;
    }

    if (type === "dislike") {
      hasVoted = false;
      story.score = story.score - 1;
    }
  };

  const formattedDate = formatDate(story.created_at.toString());
</script>

<li
  class="flex items-center gap-5 border-b border-b-brand-base-content/10 px-6 py-4 sm:gap-8"
>
  <div class="flex flex-col items-center">
    {#if !hasVoted}
      <button
        class="rounded-md p-1 transition-colors hover:bg-gray-700/60"
        on:click={() => handleVote("like")}
      >
        <ArrowUp />
      </button>
    {/if}

    <span class="p-1 text-2xl font-semibold">{story.score}</span>
  </div>

  <div class="flex flex-col gap-2">
    <div>
      <a
        href={story.url ? story.url : `/item/${story.id}`}
        class="font-semibold text-gray-100">{story.title}</a
      >
      {#if story.url}
        <span class="text-gray-400">({new URL(story.url).hostname})</span>
      {/if}
    </div>

    <div class="text-brand-base-content">
      <div class="inline-block">
        <span>by</span>

        <a
          class="underline transition-colors hover:text-indigo-300 focus:text-indigo-300"
          href="/user/{story.author}"
        >
          {story.author}
        </a>

        <time datetime={story.created_at.toString()}>{formattedDate}</time>
      </div>

      <a
        href="/item/{story.id}"
        class="border-l border-brand-base-content/30 pl-1 underline transition-colors hover:text-indigo-300 focus:text-indigo-300"
      >
        comments
      </a>

      {#if hasVoted}
        <button
          class="border-l border-brand-base-content/30 pl-1 underline transition-colors hover:text-indigo-300"
          on:click={() => handleVote("dislike")}
        >
          unvote
        </button>
      {/if}
    </div>
  </div>
</li>
