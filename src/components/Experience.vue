<template>
    <div class="flex md:flex-row flex-col mb-5 h-screen">
        <div class="flex flex-col md:ml-5 w-full">
            <p class="nerd md:text-6xl text-4xl my-8 font-bold md:text-left">$experience</p>
            <div class="flex flex-col md:flex-row w-full">
                <tablist @toggle_active="active_panel_handler"/>
                <splitline />
                <div class="relative  md:w-full md:mx-2 md:my-2 my-4">
                    <div v-for="(item, index) in listItems" :key="index">
                        <panel :PanelID="item.Panel_ID"
                            :ExpTitle="item.ExpTitle" :ExpList="item.ExpList"
                            v-if="active_panel===item.Panel_ID" class="absolute w-full left-0 md:w-2/3 md:mx-2 md:my-2 my-4"/>
                    </div>
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

interface ExpList {
    JobYear?: string;
    Jobs: string[];
}

interface JobList {
    Panel_ID: string;
    ExpTitle: string;
    ExpList: ExpList[];
}

const active_panel_handler = (value: string) => {
    active_panel.value = value;
    // console.log(active_panel.value);
}

const active_panel = ref('1');

const listItems = ref<JobList[]>(
    [
        {
            Panel_ID: "1",
            ExpTitle: "資訊技術相關",
            ExpList: [
                {
                    JobYear: "2017",
                    Jobs: [
                        "Greenmech世界機關王大賽 世界賽入選",
                    ]
                },
                {
                    JobYear: "2019",
                    Jobs: [
                        "25th 國立鳳山高中 電腦資訊社 - 社長",
                        "2019 高級中學學科能力競賽 高屏區 - 佳作",
                        "SCIST工作人員"
                    ]
                },
                {
                    JobYear: "2022",
                    Jobs: [
                        "大學程式能力檢定CPE - 5/7(Pr97)",
                        "4th 銘傳大學Google學生開發者社群 - 核心團隊",
                        "4th 銘傳大學開源社 - 學術",
                        "2022 全國私立大專校院程式競賽PUPC - 銅牌",
                        "2022 國際大學生程式設計競賽ICPC 臺灣區 - 參賽"
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
            Panel_ID: "2",
            ExpTitle: "遊戲相關",
            ExpList: [
                {
                    JobYear: "音樂遊戲",
                    Jobs: [
                        "Bang Dream 28以下全AP確定 最高AP29 最高FC29",
                        "世界計劃 真皆傳(AP數35 最高AP 31 最高FC 32)",
                        "Arcaea 摘星(Ptt 12.25) PM數100",
                        "Maimai Rating 14250"
                    ]
                }
            ]
        },
        {
            Panel_ID: "3",
            ExpTitle: "其他學經歷",
            ExpList: [
                {
                    JobYear: "粉絲專頁",
                    Jobs: [
                        "佩可美食協會 - 花子編",
                        "法蘭西斯莫來管 - 盆景植物編"
                    ],
                },
                {
                    JobYear: "其他",
                    Jobs: [
                        "我有女友(我女友叫我寫的"
                    ]
                }
            ]
        }
    ]
);


</script>
