<script setup lang="ts">
import profile from '../data/profile.json'
import SectionTitle from '../components/ui/SectionTitle.vue'
</script>

<template>
  <section id="friends" class="py-4 md:py-8">
    <SectionTitle
      kicker="Friends"
      title="友站快速連結"
      subtitle="一些喜歡的網站或朋友的作品連結。"
    />
    <div class="my-8">
      <div v-if="profile.friendLinks.length" class="grid gap-4 md:grid-cols-3">
        <a
          v-for="item in profile.friendLinks"
          :key="item.name"
          :href="item.href"
          target="_blank"
          rel="noreferrer"
          class="card rounded-[18px] p-5 text-gray-100/90 hover:border-gray-200/50 transition"
        >
          <p class="text-sm uppercase tracking-[0.3em] text-gray-300/60">{{ item.name }}</p>
          <p class="mt-3 text-base text-gray-100/80">{{ item.description }}</p>
        </a>
      </div>
      <p v-else class="text-sm text-gray-300/60">尚未加入友站連結，之後會補上。</p>
    </div>
  </section>
</template>
