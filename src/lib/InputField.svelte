<script lang="ts">
  export let command = "";

  export const focus = () => {
    input.focus();
  };

  let input: HTMLInputElement;
</script>

<input class={$$restProps['class'] + ' input-field'} bind:this={input} type="text" bind:value={command} />
