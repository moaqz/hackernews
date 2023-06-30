<script>
  import { enhance } from "$app/forms";
  import Button from "./button.svelte";
  import Navlink from "./navlink.svelte";

  /** @type {import("lucia-auth").User | null}*/
  export let session;
</script>

<header class="border-b border-b-brand-base-content/10 bg-brand-base-100">
  <nav
    class="mx-auto grid max-w-4xl grid-cols-2 grid-rows-2 items-center gap-4 px-3 py-4 sm:grid-cols-[auto,1fr,auto] sm:grid-rows-1"
  >
    <a href="/">
      <img src="/y18.svg" width="24" height="24" alt="ycombinator logo" />
    </a>

    <div
      class="order-2 col-span-2 flex items-center space-x-4 overflow-auto pb-2 sm:order-1 sm:col-span-1 sm:pb-0"
    >
      <Navlink path="/newest" text="New" />
      {#if session}
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
      {#if session}
        <a
          href="/user/{session.username}"
          class="hover:text-brand-accent-content hover:transition-colors"
          >{session.username}</a
        >
        <span>|</span>
        <form method="post" action="/logout" use:enhance>
          <Button>Sign out</Button>
        </form>
      {:else}
        <Button href="/signin">Sign in</Button>
      {/if}
    </div>
  </nav>
</header>
