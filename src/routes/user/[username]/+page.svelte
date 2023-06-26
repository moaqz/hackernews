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
        <span class="inline-block mb-1">About:</span>
        <pre class="whitespace-pre-wrap break-words">{data.profile.about}</pre>
      </li>
    {/if}
  </ul>

  <div class="flex items-center gap-3 mb-4">
    <a
      href="/user/{data.profile.username}/submissions"
      class="underline text-zinc-300 hover:text-zinc-50">submissions</a
    >
    <a
      href="/user/{data.profile.username}/comments"
      class="underline text-zinc-300 hover:text-zinc-50">comments</a
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
