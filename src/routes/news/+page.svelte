<script>
  import StoryCard from "@/components/story-card.svelte";
  import ArrowLeft from "@/components/icons/arrow-left.svelte";
  import ArrowRight from "@/components/icons/arrow-right.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div>
  {#if data.stories && data.stories.length > 0}
    <ul>
      {#each data.stories as story}
        <StoryCard {story} session={data.user} />
      {/each}
    </ul>

    <div class="flex items-center justify-center gap-4 py-4">
      {#if data.page > 1}
        <a
          href="?p={data.page - 1}"
          class="inline-flex items-center gap-3 text-zinc-300 transition-colors hover:text-zinc-50"
        >
          <ArrowLeft />
          <span>Previous</span>
        </a>
      {:else}
        <span class="inline-flex items-center gap-3 opacity-50">
          <ArrowLeft />
          <span>Previous</span>
        </span>
      {/if}
      <span>|</span>
      <a
        href="?p={data.page + 1}"
        class="inline-flex items-center gap-3 text-zinc-300 transition-colors hover:text-zinc-50"
      >
        <span>Next</span>
        <ArrowRight />
      </a>
    </div>
  {:else}
    <div class="flex flex-col items-center gap-3 py-8">
      <p class="text-center text-3xl text-zinc-50">No results found</p>
      <a
        href="?p={data.page - 1}"
        class="rounded-md bg-amber-400 px-3 py-1.5 text-black transition-colors hover:bg-amber-500"
      >
        Go to previous page</a
      >
    </div>
  {/if}
</div>
