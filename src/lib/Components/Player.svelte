<script lang="ts">
    import type Player from "~/lib/Models/Player";

    export let player: Player

    $: health = player.health
</script>

<div>
    Player

    <p>
        Health: {health}
        Mana: {player.mana}
    </p>
</div>
