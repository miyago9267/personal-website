<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="flex md:flex-row flex-col mb-5 h-screen items-center">
    <div class="flex md:mr-5 md:w-2/5 justify-center mb-2">
      <img
        src="https://drive.miyago9267.com/d/home/miyago/Pictures/pic/miyago_avatar.png"
        alt=""
        class="w-58 h-58 rounded-xl md:w-7/8 md:h-7/8  opacity-80"
      >
    </div>
    <div class="flex flex-col mt-5 md:ml-5 md:w-3/5 items-center">
      <p class="nerd md:text-6xl text-4xl mb-2 font-bold mt-0 md:text-left">
        $about_me
      </p>
      <ul class="flex flex-col items-start list-inside pl-0">
        <li class="md:text-xl text-lg mb-2">
          名字　　|　水源宮語
        </li>
        <li class="md:text-xl text-lg mb-2">
          暱稱　　|　宮語、Miyago
        </li>
        <li class="md:text-xl text-lg mb-2">
          關鍵字　|　ICT、MUG、EDM
        </li>
      </ul>
      <div class="flex flex-col list-inside items-center">
        <p class="text-left text-gray-400 w-80 md:w-3/4 md:text-xl text-lg tracking-widest md:leading-[50px] py-3 break-words mb-0">
          一個平凡的學生，SRE工程師同時在補大學學歷。技能樹亂點，喜歡亂學雜七雜八的東西，幾乎萬能但什麼都不精。
        </p>
        <p class="text-left text-gray-400 w-80 md:w-3/4 md:text-xl text-lg tracking-widest md:leading-[50px] py-3 break-words mt-0">
          經常研究一項新事物就會忘我w，喜歡哲學思考和科學研究，同時也玩文學，最近在學習DTM音樂製作。
        </p>
      </div>
    </div>
  </div>
</template>
