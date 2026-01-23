<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
import Tag from '../components/ui/Tag.vue'
const profile = useProfile()
</script>

<template>
  <section
    id="projects"
    class="py-4 md:py-8"
  >
    <SectionTitle
      kicker="Side Projects"
      title="持續輸出的 Side Project"
      subtitle="把興趣、研究與實驗變成可追蹤的作品。"
    />
    <div class="my-8 grid gap-6 md:grid-cols-3">
      <article
        v-for="project in profile.sideProjects"
        :key="project.name"
        class="card-surface rounded-[20px] p-6 flex flex-col justify-between gap-6 bg-[var(--card-bg)] shadow-[var(--card-shadow)]"
      >
        <div>
          <h3 class="text-xl text-[var(--text)] font-semibold">
            {{ project.name }}
          </h3>
          <p class="mt-3 text-sm md:text-base text-[var(--muted)]">
            {{ project.description }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="item in project.stack"
            :key="item"
            :label="item"
          />
        </div>
        <a
          v-if="project.href !== '#'"
          :href="project.href"
          target="_blank"
          rel="noreferrer"
          class="text-sm text-[var(--muted)] hover:text-[var(--text)] transition"
        >
          View project →
        </a>
      </article>
    </div>
  </section>
</template>
