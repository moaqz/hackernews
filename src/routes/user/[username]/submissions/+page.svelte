<script>
  import SubmissionCard from "@/components/submission-card.svelte";

  /** @type {import("./$types").PageData}*/
  export let data;
</script>

<div>
  {#if data.submissions && data.submissions.length > 0}
    <ul>
      {#each data.submissions as submission}
        <SubmissionCard {submission} />
      {/each}
    </ul>
  {:else}
    <p class="py-8 text-center text-2xl text-gray-300">
      This user does not have any submission yet.
    </p>
  {/if}
</div>
