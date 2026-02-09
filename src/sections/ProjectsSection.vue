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
      title="Side Projects"
      subtitle="把靈機一動的鬼點子變成看得見的現實。"
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

<style scoped>
/* 彩蛋:專案統計樣式 */
.project-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(var(--text-rgb, 0, 0, 0), 0.03);
  border-radius: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.project-stats:hover {
  opacity: 1;
  background: rgba(var(--text-rgb, 0, 0, 0), 0.05);
}

.stat-item {
  font-weight: 600;
  color: var(--text);
}

.stat-divider {
  color: var(--muted);
}
</style>

