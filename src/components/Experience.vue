<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
    <div class="flex md:flex-row flex-col mb-5 h-screen">
        <div class="flex ml-5 md:w-2/5 items-center justify-center">
            <img src="../assets/miyago_avatar.png" alt="" class="w-58 h-58 rounded-xl md:w-92 md:h-92 opacity-80">
        </div>
        <div class="flex flex-col ml-5 md:w-3/5">
            <p class="nerd md:text-8xl text-4xl mb-2 item-center font-bold">$about_me</p>
            <ul class="flex flex-col items-start list-inside">
                <li class="md:text-xl text-lg mb-2">名字　　|　水源宮語</li>
                <li class="md:text-xl text-lg mb-2">暱稱　　|　宮語、Miyago</li>
                <li class="md:text-xl text-lg mb-2">關鍵字　|　ICT、MUG、EDM</li>
            </ul>
            <div class="flex flex-col list-inside">
                <p class="text-left text-gray-400 w-full md:w-96 md:text-xl text-lg tracking-widest md:leading-[50px] md:p-0 p-6">
                    一個平凡的學生，SRE工程師同時在補大學學歷。技能樹亂點，喜歡亂學雜七雜八的東西，幾乎萬能但什麼都不精。
                </p>
            </div>
        </div>
    </div>
</template>
