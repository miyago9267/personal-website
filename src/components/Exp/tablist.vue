<template>
    <div class="flex flex-warp md:flex-col justify-around md:justify-start">
        <tab title="ICT" controll_panel="1" @toggle="handleToggle"/>
        <tab title="MUG" controll_panel="2" @toggle="handleToggle"/>
        <tab title="Other" controll_panel="3" @toggle="handleToggle"/>
    </div>
</template>

<script setup lang="ts">
import tab from './tab.vue'

interface toggle_active {
    (event: 'toggle_active', value: string): void;
}

const emit = defineEmits<toggle_active>()

const handleToggle = (value: string) => {
    emit('toggle_active', value)
}
</script>