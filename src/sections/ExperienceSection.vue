<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
const profile = useProfile()
</script>

<template>
  <section
    id="experience"
    class="py-4 md:py-8"
  >
    <SectionTitle
      kicker="Experience"
      title="各種學經歷"
      subtitle="各個領域的累積，串成一條命運石之門選擇的世界線。"
    />

    <div class="my-8 grid gap-6">
      <article
        v-for="group in profile.experience"
        :key="group.title"
        class="rounded-[20px] p-6 md:p-8 bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)]"
      >
        <h3 class="text-xl md:text-2xl text-[var(--text)] font-semibold m-0">
          {{ group.title }}
        </h3>
        <div class="mt-6 grid gap-2">
          <div
            v-for="entry in group.entries"
            :key="entry.year"
            class="grid gap-2"
          >
            <span class="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">{{ entry.year }}</span>
            <ul class="grid gap-2 text-[var(--text)]/90 m-1">
              <li
                v-for="item in entry.items"
                :key="item"
                class="text-base md:text-lg"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
