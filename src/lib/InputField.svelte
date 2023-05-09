<script lang="ts">
  export let command = "";

  export const focus = () => {
    input.focus();
  };

  let input: HTMLInputElement;
</script>

<input bind:this={input} type="text" bind:value={command} />
