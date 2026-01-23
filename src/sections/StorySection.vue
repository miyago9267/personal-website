<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
const profile = useProfile()
</script>

<template>
  <section
    id="story"
    class="py-4 md:py-8"
  >
    <div class="grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-start">
      <div class="flex flex-col gap-6">
        <SectionTitle
          kicker="Story"
          title="我的個人故事與軌跡"
        />
        <div class="flex flex-col gap-4 text-base md:text-lg text-[var(--muted)] leading-relaxed">
          <p
            v-for="line in profile.story"
            :key="line"
          >
            {{ line }}
          </p>
        </div>
      </div>
      <div class="grid gap-4 md:mt-16">
        <div class="rounded-[20px] p-6 bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)]">
          <p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Identity
          </p>
          <p class="mt-3 text-lg text-[var(--text)]">
            {{ profile.nickname }}
          </p>
          <p class="text-sm text-[var(--muted)]">
            {{ profile.name }}
          </p>
        </div>
        <div class="rounded-[20px] p-6 bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)]">
          <p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Current Focus
          </p>
          <ul class="mt-3 grid gap-2 text-[var(--text)]/80">
            <li
              v-for="item in profile.highlights"
              :key="item.title"
            >
              {{ item.title }} · {{ item.value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
