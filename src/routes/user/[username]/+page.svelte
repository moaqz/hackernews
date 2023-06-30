<script>
  import Button from "@/components/button.svelte";
  import { formatDate } from "@/lib/date";

  /** @type {import('./$types').PageData} */
  export let data;

  const date = formatDate(data.profile.created_at.toString());
</script>

<div class="p-8">
  <h1 class="text-2xl font-semibold text-gray-100">
    User: {data.profile.username}
  </h1>

  <ul class="my-4 space-y-1">
    <li>
      <span class="text-gray-300 font-semibold">Created:</span>
      <span>{date}</span>
    </li>

    <li>
      <span class="text-gray-300 font-semibold">Karma:</span>
      <span>{data.profile.karma}</span>
    </li>

    {#if data.profile.about}
      <li>
        <span class="text-gray-300 font-semibold">About:</span>
        <pre class="whitespace-pre-wrap break-words font-sans">{data.profile
            .about}</pre>
      </li>
    {/if}
  </ul>

  <div class="mb-4 flex items-center gap-3">
    <a
      href="/user/{data.profile.username}/submissions"
      class="text-gray-300 underline hover:text-gray-50"
    >
      submissions
    </a>
    <a
      href="/user/{data.profile.username}/comments"
      class="text-gray-300 underline hover:text-gray-50"
    >
      comments
    </a>
  </div>

  {#if data.user}
    <Button href="/user/{data.profile.username}/edit" wfull={false}>
      Edit Profile
    </Button>
  {/if}
</div>
