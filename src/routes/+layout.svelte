<script>
  import "../app.css";
  import Navlink from "@/components/navlink.svelte";
  import { enhance } from "$app/forms";

  /** @type {import("./$types").PageData}*/
  export let data;
</script>

<div
  class="grid min-h-screen grid-rows-[auto,1fr] bg-neutral-900 text-zinc-200"
>
  <header class="border-b border-b-neutral-600 bg-neutral-800">
    <nav
      class="mx-auto grid max-w-4xl grid-cols-2 grid-rows-2 items-center gap-4 px-3 py-4 sm:grid-cols-[auto,1fr,auto] sm:grid-rows-1"
    >
      <a href="/">
        <img src="/y18.svg" width="24" height="24" alt="ycombinator logo" />
      </a>

      <div
        class="order-2 col-span-2 flex items-center space-x-4 overflow-auto pb-2 sm:order-1 sm:col-span-1 sm:pb-0"
      >
        <Navlink path="/new" text="New" />
        {#if data.user}
          <Navlink path="/threads" text="Threads" />
        {/if}
        <Navlink path="/past" text="Past" />
        <Navlink path="/comments" text="Comments" />
        <Navlink path="/ask" text="Ask" />
        <Navlink path="/show" text="Show" />
        <Navlink path="/jobs" text="Jobs" />
        <Navlink path="/submit" text="Submit" />
      </div>

      <div
        class="order-1 flex items-center space-x-2 justify-self-end sm:order-2"
      >
        {#if data.user}
          <span>{data.user.username}</span>
          <span>|</span>
          <form method="post" action="/logout" use:enhance>
            <input
              type="submit"
              value="Sign out"
              class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors hover:bg-yellow-500 focus:bg-yellow-500"
            />
          </form>
        {:else}
          <a
            href="/signin"
            class="rounded-md bg-yellow-400 px-3 py-1.5 text-black transition-colors hover:bg-yellow-500 focus:bg-yellow-500"
            >Sign in</a
          >{/if}
      </div>
    </nav>
  </header>

  <main class="mx-auto h-full w-full max-w-4xl bg-zinc-800">
    <slot />
  </main>
</div>
