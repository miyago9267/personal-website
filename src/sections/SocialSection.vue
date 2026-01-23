<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
const profile = useProfile()
</script>

<template>
  <section
    id="social"
    class="py-4 md:py-8"
  >
    <SectionTitle
      kicker="Social"
      title="社群導流與出沒點"
      subtitle="想看更多日常、作品或交流，歡迎從這裡找到我。"
    />
    <div class="my-8 grid gap-6 md:grid-cols-3">
      <a
        v-for="channel in profile.channels"
        :key="channel.title"
        :href="channel.href"
        target="_blank"
        rel="noreferrer"
        class="card-surface rounded-[20px] p-6 transition bg-[var(--card-bg)] shadow-[var(--card-shadow)]"
      >
        <p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{{ channel.title }}</p>
        <p class="mt-3 text-lg text-[var(--text)]">{{ channel.detail }}</p>
        <span class="mt-6 inline-flex text-sm text-[var(--muted)]">Follow →</span>
      </a>
    </div>
  </section>
</template>
