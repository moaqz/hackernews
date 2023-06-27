<script>
  import { formatDate } from "@/lib/date";
  import Letter from "./icons/letter.svelte";

  /** @typedef Submission
   * @property {number} id
   * @property {string} title
   * @property {string | null} url
   * @property {Date} created_at
   * @property {number} score
   * @property {Object} author
   * @property {string} author.username
   * @property {string} author.id
   */

  /** @type {Submission}*/
  export let submission;
</script>

<li class="flex items-center gap-5 border-b border-zinc-700 px-6 py-4 sm:gap-8">
  <Letter />
  <div class="flex flex-col gap-2">
    <div>
      <a
        href="/item/{submission.id}"
        class="font-semibold text-zinc-200 transition-colors hover:text-zinc-50"
        >{submission.title}</a
      >

      {#if submission.url}
        <a href={submission.url} class="text-zinc-400">
          ({new URL(submission.url).hostname})
        </a>
      {/if}
    </div>
    <div class="text-zinc-200">
      <div class="inline-block">
        <span>by</span>
        <a
          class="underline transition-colors hover:text-amber-300 focus:text-amber-300"
          href="/user/{submission.author.username}"
          >{submission.author.username}</a
        >
        <time datetime={submission.created_at.toString()}
          >{formatDate(submission.created_at.toString())}</time
        >
      </div>
      <span class="border-l border-zinc-400 pl-1">{submission.score} votes</span
      >
      <a
        href="/item/{submission.id}"
        class="border-l border-zinc-400 pl-1 underline transition-colors hover:text-amber-300 focus:text-amber-300"
        >comments</a
      >
    </div>
  </div>
</li>
