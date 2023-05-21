<script lang="ts">
    export let value: number = 0;
    export let maxValue: number = 100;

    export let color: string;

    let progress
    $: progress = Math.min(100, Math.max(0, value / maxValue * 100)) + '%';
</script>

{#if maxValue > 0}
    <div class="bg-gray-300 leading-none p-[2px] relative overflow-hidden rounded-lg w-full">
        <div class="text-[0.65rem] text-center relative z-[1]">{value} / {maxValue}</div>
        <div class={color + ' absolute top-0 left-0 h-full'} style={`width: ${progress}`}></div>
    </div>
{/if}
