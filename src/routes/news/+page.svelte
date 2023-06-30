<script>
  import StoryCard from "@/components/story-card.svelte";
  import ArrowLeft from "@/components/icons/arrow-left.svelte";
  import ArrowRight from "@/components/icons/arrow-right.svelte";
  import Button from "@/components/button.svelte";

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
          class="inline-flex items-center gap-3 text-gray-300 transition-colors hover:text-gray-50"
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
      <span class="text-brand-base-content/20">|</span>
      <a
        href="?p={data.page + 1}"
        class="inline-flex items-center gap-3 text-gray-300 transition-colors hover:text-gray-50"
      >
        <span>Next</span>
        <ArrowRight />
      </a>
    </div>
  {:else}
    <div class="flex flex-col items-center gap-3 py-8">
      <p class="text-center text-3xl text-gray-300">No results found</p>
      <Button href="?p={data.page - 1}" wfull={false}>
        Go to previous page
      </Button>
    </div>
  {/if}
</div>
