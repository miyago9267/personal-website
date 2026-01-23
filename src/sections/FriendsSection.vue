<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
const profile = useProfile()
</script>

<template>
  <section
    id="friends"
    class="py-4 md:py-8"
  >
    <SectionTitle
      kicker="Friends"
      title="友站快速連結"
      subtitle="一些喜歡的網站或朋友的作品連結。"
    />
    <div class="my-8">
      <div
        v-if="profile.friendLinks.length"
        class="grid gap-4 md:grid-cols-3"
      >
        <a
          v-for="item in profile.friendLinks"
          :key="item.name"
          :href="item.href"
          target="_blank"
          rel="noreferrer"
          class="rounded-[18px] p-5 text-[var(--text)]/90 transition bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)] hover:border-[var(--card-border)]"
        >
          <p class="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">{{ item.name }}</p>
          <p class="mt-3 text-base text-[var(--text)]/80">{{ item.description }}</p>
        </a>
      </div>
      <p
        v-else
        class="text-sm text-[var(--muted)]"
      >
        尚未加入友站連結，之後會補上。
      </p>
    </div>
  </section>
</template>
