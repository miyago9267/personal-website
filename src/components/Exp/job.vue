<template>
    <div class="flex flex-col justify-left ">
        <span class="text-left text-sm md:text-xl ">{{ progs.JobYear }}</span>
        <ul v-for="text in progs.Jobs" class="flex flex-col items-start list-inside my-2 list-inside">
           <li class="md:text-lg text-xs text-gray-400 break-words"> {{ text }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">

interface ExpList {
    JobYear?: string;
    Jobs: string[];
}

const progs = defineProps<ExpList>()

</script>