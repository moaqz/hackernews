<script>
  /** @type {import("@/lib/types").CommentCard} */
  export let comment;
</script>

<li class="flex flex-col gap-4 border-b border-brand-base-content/10 px-6 py-4">
  <div class="flex flex-col gap-3 sm:flex-row">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg
    >

    <div>
      <a
        href="/user/{comment.author.username}"
        class="font-semibold text-gray-200 hover:text-indigo-300 hover:underline"
      >
        {comment.author.username}
      </a>
      <span class="text-gray-300">commented on</span>
      <a
        href="/item/{comment.story_id}"
        class="font-semibold text-gray-200 hover:text-indigo-300 hover:underline"
      >
        {comment.story_title}
      </a>
    </div>
  </div>

  <pre
    class="whitespace-pre-wrap break-words font-sans text-brand-base-content">{comment.content}</pre>
</li>
