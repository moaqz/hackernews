<script>
  import { formatDate } from "@/lib/date";
  import Letter from "./icons/letter.svelte";

  /** @type {import("@/lib/types").Submission}*/
  export let submission;
</script>

<li
  class="flex items-center gap-5 border-b border-brand-base-content/10 px-6 py-4 sm:gap-8"
>
  <div>
    <Letter />
  </div>

  <div class="flex flex-col gap-2">
    <div>
      <a href="/item/{submission.id}" class="font-semibold text-gray-100">
        {submission.title}
      </a>

      {#if submission.url}
        <a href={submission.url} class="text-zinc-400">
          ({new URL(submission.url).hostname})
        </a>
      {/if}
    </div>

    <div class="text-brand-base-content">
      <div class="inline-block">
        <span>by</span>

        <a
          class="underline transition-colors hover:text-indigo-300 focus:text-indigo-300"
          href="/user/{submission.author.username}"
        >
          {submission.author.username}
        </a>

        <time datetime={submission.created_at.toString()}>
          {formatDate(submission.created_at.toString())}
        </time>
      </div>

      <span class="border-l border-zinc-400 pl-1">
        {submission.score} votes
      </span>

      <a
        href="/item/{submission.id}"
        class="border-l border-brand-base-content/30 pl-1 underline transition-colors hover:text-indigo-300 focus:text-indigo-300"
      >
        comments
      </a>
    </div>
  </div>
</li>
