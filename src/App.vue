<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import About from './components/About.vue';
import Experience from './components/Experience.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col nerd text-gray-100 tracking-wide duration-1000 p-0 md:p-8 ml-0 ">
      <HelloWorld msg=""/>
      <About msg=""/>
      <Experience msg=""/>
      <Footer />
    </div>
  </div>
</template>