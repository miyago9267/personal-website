<template>
    <div class="md:ml-10">
        <h3 class="text-left text-red-400 font-bold mt-1 mb-4 md:text-2xl"> {{ progs.ExpTitle }}</h3>
        <div class="flex flex-col my-4 py-2">
            <ui v-for="exp in progs.ExpList" class="flex flex-col md:items-start list-outside">
                <job :-job-year="exp.JobYear" :-jobs="exp.Jobs"/>
            </ui>
        </div>
    </div>
</template>

<script setup lang="ts">
import job from './job.vue'

interface ExpList {
    JobYear?: string;
    Jobs: string[];
}

interface List {
     ExpTitle: string;
     ExpList: ExpList[];
}

const progs = defineProps<List>()

</script>
