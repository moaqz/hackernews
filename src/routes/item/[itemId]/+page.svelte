<script>
  import CommentFeed from "@/components/comment-feed.svelte";
  import { formatDate } from "@/lib/date";
  import { enhance } from "$app/forms";
  import Button from "@/components/button.svelte";

  /** @type {import("./$types").PageData}*/
  export let data;

  const formattedDate = formatDate(data.item.created_at.toString());

  let loading = false;
</script>

<div class="border-b border-zinc-700 p-6">
  {#if data.item.url}
    <a href={data.item.url} class="text-xl font-semibold text-zinc-200">
      {data.item.title}
    </a>
    <span class="text-zinc-400">({new URL(data.item.url).hostname})</span>
  {:else}
    <h1 class="text-xl font-semibold text-zinc-200">{data.item.title}</h1>
  {/if}

  <div class="mt-4 text-zinc-200">
    <div class="inline-block">
      <span>by</span>
      <a
        class="underline transition-colors hover:text-amber-300 focus:text-amber-300"
        href="/user/{data.item.author.username}"
      >
        {data.item.author.username}
      </a>
      <time datetime={data.item.created_at.toString()}>{formattedDate}</time>
    </div>

    <span class="border-l border-zinc-400 pl-1">
      {data.item.score}
      {data.item.score > 1 ? "votes" : "vote"}
    </span>
  </div>
</div>

<div class="px-6 py-4">
  {#if data.user}
    <div>
      <p class="mb-3">
        Comment as <span class="font-semibold text-yellow-400"
          >{data.user.username}</span
        >
      </p>

      <form
        class="flex flex-col gap-3"
        method="post"
        action="?/comment"
        use:enhance={() => {
          loading = true;

          return async ({ update }) => {
            await update();

            loading = false;
          };
        }}
      >
        <textarea
          id="content"
          name="content"
          placeholder="What are your thoughts?"
          required
          class="resize-y rounded-sm border border-zinc-600 bg-zinc-700 px-2 py-1 outline-none focus:ring-2 focus:ring-zinc-500"
        />

        <input
          type="text"
          value={data.item.id}
          id="storyId"
          name="storyId"
          hidden
        />

        <Button disabled={loading} wfull={false}>
          {#if loading}
            Adding comment...
          {:else}
            Add comment
          {/if}
        </Button>
      </form>
    </div>
  {:else}
    <Button href="/signin" wfull={false}>Login to comment</Button>
  {/if}
</div>

<CommentFeed />
