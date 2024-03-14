<template>
    <div class="flex flex-col justify-left ">
        <span class="text-left text-sm">{{ progs.JobYear }}</span>
        <ul v-for="text in progs.Jobs" class="flex flex-col items-start list-inside my-2">
           <li class="md:text-sm text-xs text-gray-400"> {{ text }}</li>
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