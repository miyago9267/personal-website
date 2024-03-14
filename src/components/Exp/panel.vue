<template>
    <div class="md:ml-10">
        <h3 class="md:text-left text-red-400 font-bold"> {{ progs.ExpTitle }}</h3>
        <div class="flex flex-col">
            <ui v-for="exp in progs.ExpList" class="flex flex-col md:items-start">
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

<!--
<li class="md:text-xl text-lg mb-2">25th FSSH FCI - Leader</li>
<li class="md:text-xl text-lg mb-2">4th MCU GDSC - Core Team</li>
<li class="md:text-xl text-lg mb-2">2022 PUPC - Bronze Metal</li>
<li class="md:text-xl text-lg mb-2">2023 PUPC - Golden Metal</li>


 -->