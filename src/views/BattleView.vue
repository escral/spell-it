<script setup lang="ts">
    import BattleState, { Mode } from "~/lib/BattleState"
    import ForestLocation from "~/lib/ForestLocation"
    import InputController from "~/lib/InputController"
    import Player from "~/lib/Models/Player"
    import Creature from "~/components/UI/Creature.vue"
    import PinnedCommands from "~/components/UI/PinnedCommands.vue"
    import BattleLog from "~/components/UI/BattleLog.vue"

    defineOptions({
        name: 'BattleView',
    })

    const battle = new BattleState({
        location: new ForestLocation(),
        player: reactive(new Player('Escral')),
    })

    const inputController = new InputController(battle)

    const mode = computed(() => battle.mode)
    const command = computed(() => inputController.currentCommand.value)

    onMounted(() => {
        inputController.register()
        battle.time.start()
    })

    onDeactivated(() => {
        inputController.unregister()
        battle.time.stop()
    })

    watch(mode, (mode) => {
        if (mode === Mode.Paused) {
            document.body.style.filter = 'grayscale(1)'
        } else {
            document.body.style.filter = ''
        }
    })
</script>

<template>
    <div class="p-12 w-full flex flex-col gap-12">
        <div class="flex gap-24">
            <Creature class="w-80" :creature="battle.player" acting />

            <div class="w-full grid grid-cols-3 gap-12">
                <Creature
                    v-for="(creature, $i) in battle.location.creatures"
                    :key="$i"
                    :creature="creature"
                />
            </div>
        </div>

        <BattleLog :log="battle.log" />

        <PinnedCommands />

        <div class="fixed bottom-12 w-[40rem] left-1/2 -translate-x-1/2 flex flex-col gap-2">
            <div v-if="command.length" class="text-center text-xl">
                «{{ command }}»
            </div>

            <div
                class="text-white mx-auto w-fit leading-none py-1.5 px-3 rounded text-sm"
                :class="{
                    'bg-slate-500': mode === Mode.Normal,
                    'bg-blue-500': mode === Mode.Casting,
                    'bg-gray-500': mode === Mode.Paused,
                }"
            >
                {{ mode }}
            </div>
        </div>
    </div>
</template>
