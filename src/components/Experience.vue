<template>
    <div class="flex md:flex-row flex-col mb-5 h-screen">
        <div class="flex flex-col md:ml-5 w-full">
            <p class="nerd md:text-6xl text-4xl my-8 font-bold md:text-left">$experience</p>
            <div class="flex flex-col md:flex-row w-full">
                <tablist />
                <splitline />
                <div class="relative  md:w-2/3 md:mx-2 md:my-2 my-4">
                    <panel :ExpTitle="progs.ExpTitle" :ExpList="progs.ExpList" @toggle="togglePanelActive"
                        v-for="progs in listItems" class="absolute left-0 md:w-2/3 md:mx-2 md:my-2 my-4"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import tablist from './Exp/tablist.vue';
import splitline from './Exp/splitline.vue';
import panel from './Exp/panel.vue';
import { ref } from 'vue';

defineProps<{ msg: string }>()

const active_panel = ref(0);

const togglePanelActive = () => {

}

interface ExpList {
    JobYear?: string;
    Jobs: string[];
}

interface JobList {
     ExpTitle: string;
     ExpList: ExpList[];
}

const listItems = ref<JobList[]>(
    [
        {
            ExpTitle: "資訊技術相關",
            ExpList: [
                {
                    JobYear: "2019",
                    Jobs: [
                        "25th 鳳山高中電資社 - 社長",
                    ]
                },
                {
                    JobYear: "2022",
                    Jobs: [
                        "4th 銘傳大學GDSC - 核心團隊",
                        "2022 PUPC - 銅牌",
                        "2022 ICPC桃園站 - 參賽"
                    ]
                },
                {
                    JobYear: "2023",
                    Jobs: [
                        "2023 PUPC - 金牌",
                    ]
                }
            ]
        },
        {
            ExpTitle: "遊戲相關",
            ExpList: [
                {
                    Jobs: [
                        "Bang Dream 28以下全AP確定 最高AP29",
                        "世界計劃 真皆傳(AP數35 最高AP 31)",
                        "Arcaea 摘星(Ptt 12.25)"
                    ]
                }
            ]
        }
    ]
);


</script>
