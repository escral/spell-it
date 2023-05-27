<script setup lang="ts">
    import BattleState, { Mode } from "~/lib/BattleState"
    import ForestLocation from "~/lib/ForestLocation"
    import InputController from "~/lib/InputController"
    import Player from "~/lib/Models/Player"
    import InputText from "~/components/Input/InputText.vue"
    import Creature from "~/components/UI/Creature.vue"

    defineOptions({
        name: 'BattleView',
    })

    const battle = new BattleState({
        location: new ForestLocation(),
        player: new Player('Escral'),
    })

    const inputController = new InputController(battle)

    const mode = computed(() => battle.mode)
    const command = computed(() => inputController.currentCommand.value)

    const tryCast = () => inputController.tryCast(battle.player)

    onMounted(() => {
        inputController.register()
    })

    onDeactivated(() => {
        inputController.unregister()
    })
</script>

<template>
    <div class="p-12">
        <div class="flex items-center justify-between">
            <Creature :creature="battle.player" acting />

            <Creature
                v-for="(creature, $i) in battle.location.creatures"
                :key="$i"
                :creature="creature"
            />
        </div>

        <br>

        <div class="fixed bottom-12 w-[40rem] left-1/2 -translate-x-1/2 flex flex-col gap-2">
            <div v-if="command.length" class="text-center text-xl">
                «{{ command }}»
            </div>

            <div
                class="bg-gray-500 text-white mx-auto w-fit leading-none py-1.5 px-3 rounded text-sm"
                :class="{'bg-blue-500': mode === Mode.Casting}"
            >
                {{ mode }}
            </div>
        </div>
    </div>
</template>
