<script>
  import CommentCard from "@/components/comment-card.svelte";

  export let data;
</script>

{#each data.comments as comment}
  <CommentCard {comment} />
{/each}
