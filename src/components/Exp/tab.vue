<template>
    <div>
        <button class="border rounded-xl bg-gray-800 hover:bg-gray-700 w-30 my-1 md:text-left"
            @click="togglePanelActive">
            <span class="text-xl text-left"> {{ title }} </span>
        </button>
    </div>
</template>

<script setup lang="ts">

interface TabProps {
    title?: string;
}

defineProps<TabProps>()

defineEmits(['toggle'])
const togglePanelActive = () => {
  emit('toggle');
}

</script>