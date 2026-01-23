<script setup lang="ts">
import profile from '../data/profile.json'
import SectionTitle from '../components/ui/SectionTitle.vue'
</script>

<template>
  <section id="story" class="py-4 md:py-8">
    <div class="grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-start">
      <div class="flex flex-col gap-6">
        <SectionTitle kicker="Story" title="我的個人故事與軌跡" />
        <div class="flex flex-col gap-4 text-base md:text-lg text-gray-300/80 leading-relaxed">
          <p v-for="line in profile.story" :key="line">{{ line }}</p>
        </div>
      </div>
      <div class="grid gap-4 md:mt-16">
        <div class="card rounded-[20px] p-6">
          <p class="text-xs uppercase tracking-[0.3em] text-gray-300/60">Identity</p>
          <p class="mt-3 text-lg text-gray-50">{{ profile.nickname }}</p>
          <p class="text-sm text-gray-300/60">{{ profile.name }}</p>
        </div>
        <div class="card rounded-[20px] p-6">
          <p class="text-xs uppercase tracking-[0.3em] text-gray-300/60">Current Focus</p>
          <ul class="mt-3 grid gap-2 text-gray-100/80">
            <li v-for="item in profile.highlights" :key="item.title">{{ item.title }} · {{ item.value }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
