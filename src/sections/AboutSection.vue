<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
import Tag from '../components/ui/Tag.vue'
const profile = useProfile()
</script>

<template>
  <section
    id="about"
    class="py-4 md:py-8"
  >
    <div class="grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
      <div class="relative">
        <div class="card-surface rounded-[24px] p-6 md:p-8 bg-[var(--card-bg)] shadow-[var(--card-shadow)]">
          <img
            :src="profile.avatarUrl"
            alt="Miyago avatar"
            class="w-full rounded-2xl object-cover opacity-90"
          >
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <SectionTitle
          kicker="About"
          title="腳踏文學和理學的怪人"
        />
        <div class="flex flex-col gap-4 text-[var(--muted)] text-base md:text-lg leading-relaxed">
          <p
            v-for="line in profile.bio"
            :key="line"
          >
            {{ line }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <Tag
            v-for="item in profile.highlights"
            :key="item.title"
            :label="`${item.title} · ${item.value}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>
