<script>
  import { formatDate } from "@/lib/date";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="p-8">
  <h1 class="text-2xl font-semibold">User: {data.profile.username}</h1>

  <ul class="my-4">
    <li>Created: {formatDate(data.profile.created_at.toString())}</li>
    <li>Karma: {data.profile.karma}</li>
    {#if data.profile.about}
      <li>
        <span class="mb-1 inline-block">About:</span>
        <pre class="whitespace-pre-wrap break-words">{data.profile.about}</pre>
      </li>
    {/if}
  </ul>

  <div class="mb-4 flex items-center gap-3">
    <a
      href="/user/{data.profile.username}/submissions"
      class="text-zinc-300 underline hover:text-zinc-50">submissions</a
    >
    <a
      href="/user/{data.profile.username}/comments"
      class="text-zinc-300 underline hover:text-zinc-50">comments</a
    >
  </div>

  {#if data.user}
    <a
      href="/user/{data.profile.username}/edit"
      class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors hover:bg-yellow-500 focus:bg-yellow-500"
      >Edit Profile</a
    >
  {/if}
</div>
