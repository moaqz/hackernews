<script>
  import Message from "@/components/icons/message.svelte";
  import PanelOpen from "./icons/panel-open.svelte";
  import { formatDate } from "@/lib/date";

  /** @type {import("@/lib/types").Comment} */
  export let comment;

  const date = formatDate(comment.created_at.toString());
</script>

<article class="py-4">
  <p class="mb-1 text-gray-100">
    <span>{comment.author.username}</span> - <time>{date}</time>
  </p>

  <div class="ml-1 space-y-2 border-l-2 border-l-brand-base-content/20 pl-2">
    <pre
      class="whitespace-pre-wrap break-words font-sans text-gray-400">{comment.content}</pre>

    <div class="flex items-center gap-1">
      <a
        href="/reply?id={comment.id}&item={comment.story_id}"
        class="inline-flex items-center gap-3 rounded-md px-2 py-1 text-gray-300 transition-colors hover:bg-zinc-700 hover:text-zinc-50"
        aria-label="Reply to comment"
      >
        <Message /> <span>Reply</span>
      </a>

      <button
        class="inline-flex items-center gap-3 rounded-md px-2 py-1 text-gray-300 transition-colors hover:bg-zinc-700 hover:text-zinc-50"
        aria-label="Show replies"
      >
        <PanelOpen /> <span>Show replies</span>
      </button>
    </div>
  </div>
</article>
