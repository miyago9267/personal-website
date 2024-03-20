<template>
    <div>
        <button class="border rounded-xl bg-gray-800 hover:bg-gray-700 w-30 md:w-40 my-1 md:text-left"
            @click="progs.controll_panel && togglePanelActive(progs.controll_panel)">
            <span class="text-xl text-left md:text-2xl"> {{ title }} </span>
        </button>
    </div>
</template>

<script setup lang="ts">

interface TabProps {
    title?: string;
    controll_panel?: string;
}

interface TabEmits {
    (event: 'toggle', value: string): void;
}

const progs = defineProps<TabProps>()
const emit = defineEmits<TabEmits>()
const togglePanelActive = (value: string) => {
  emit('toggle', value);
}

</script>