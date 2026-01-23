<template>
    <div class="flex flex-warp md:flex-col justify-around md:justify-start">
        <tab v-for="item in tabList" :title="item.title" :controll_panel="item.controll_panel" @toggle="handleToggle"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import tab from './tab.vue'

interface toggle_active {
    (event: 'toggle_active', value: string): void;
}

interface tablistProps {
    title: string;
    controll_panel: string;
}

const emit = defineEmits<toggle_active>()
const tabList = ref<tablistProps[]>([
    { title: 'ICT', controll_panel: '1' },
    { title: 'Game', controll_panel: '2' },
    { title: 'Other', controll_panel: '3' }
])

const handleToggle = (value: string) => {
    emit('toggle_active', value)
}



</script>