<script>
  import "../app.css";
  import Header from "@/components/header.svelte";

  /** @type {import("./$types").PageData}*/
  export let data;
</script>

<div class="min-h-screen bg-brand-base-300 text-gray-400">
  <Header session={data.user} />

  <main class="mx-auto h-full w-full max-w-4xl bg-brand-base-100">
    <slot />
  </main>
</div>
