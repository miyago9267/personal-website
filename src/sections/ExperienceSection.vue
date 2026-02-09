<script setup lang="ts">
import { ref } from 'vue'
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
const profile = useProfile()

// 添加摺疊功能
const expandedGroups = ref<Set<string>>(new Set())

const toggleGroup = (title: string) => {
  if (expandedGroups.value.has(title)) {
    expandedGroups.value.delete(title)
  } else {
    expandedGroups.value.add(title)
  }
}

const isExpanded = (title: string) => expandedGroups.value.has(title)
</script>

<template>
  <section
    id="experience"
    class="py-4 md:py-6"
  >
    <SectionTitle
      kicker="Experience"
      title="學經歷"
      subtitle="各個領域的累積，串成一條命運石之門選擇的世界線。"
    />

    <!-- 緊湊的時間軸式佈局 -->
    <div class="my-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="group in profile.experience"
        :key="group.title"
        class="experience-card group"
        @click="toggleGroup(group.title)"
      >
        <div class="card-header">
          <h3 class="text-base md:text-lg text-[var(--text)] font-semibold">
            {{ group.title }}
          </h3>
          <button
            class="expand-btn"
            :class="{ 'is-expanded': isExpanded(group.title) }"
            aria-label="展開/收合"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- 摺疊內容 -->
        <div
          class="card-content"
          :class="{ 'is-expanded': isExpanded(group.title) }"
        >
          <div class="timeline">
            <div
              v-for="entry in group.entries"
              :key="entry.year"
              class="timeline-entry"
            >
              <span class="timeline-year">{{ entry.year }}</span>
              <ul class="timeline-items">
                <li
                  v-for="item in entry.items"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 彩蛋：hover 時顯示項目數量 -->
        <div class="card-footer">
          <span class="item-count">{{ group.entries.reduce((acc, e) => acc + e.items.length, 0) }} 項成就</span>
        </div>
      </article>
    </div>

    <!-- 設計元素：底部裝飾線 -->
    <div class="section-decoration">
      <div class="decoration-line" />
      <span class="decoration-text">El Psy Kongroo</span>
      <div class="decoration-line" />
    </div>
  </section>
</template>

<style scoped>
.experience-card {
  position: relative;
  padding: 1rem 1.25rem;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid rgba(var(--text-rgb, 0, 0, 0), 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.experience-card:hover {
  border-color: rgba(var(--text-rgb, 0, 0, 0), 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.expand-btn {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  transition: transform 0.3s ease, color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
}

.expand-btn:hover {
  color: var(--text);
}

.expand-btn.is-expanded {
  transform: rotate(180deg);
}

.card-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-content.is-expanded {
  max-height: 800px;
  margin-top: 0.75rem;
}

.timeline {
  display: grid;
  gap: 0.75rem;
}

.timeline-entry {
  display: grid;
  gap: 0.25rem;
}

.timeline-year {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  font-weight: 500;
}

.timeline-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.25rem;
}

.timeline-items li {
  font-size: 0.875rem;
  color: rgba(var(--text-rgb, 0, 0, 0), 0.85);
  padding-left: 0.75rem;
  position: relative;
}

.timeline-items li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 4px;
  height: 4px;
  background: var(--muted);
  border-radius: 50%;
}

.card-footer {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(var(--text-rgb, 0, 0, 0), 0.06);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.experience-card:hover .card-footer {
  opacity: 1;
}

.item-count {
  font-size: 0.75rem;
  color: var(--muted);
  font-weight: 500;
}

/* 底部裝飾 */
.section-decoration {
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.4;
}

.decoration-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--muted),
    transparent
  );
}

.decoration-text {
  font-size: 0.75rem;
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.05em;
}

/* 響應式調整 */
@media (max-width: 768px) {
  .experience-card {
    padding: 0.875rem 1rem;
  }

  .card-header h3 {
    font-size: 0.9375rem;
  }

  .timeline-items li {
    font-size: 0.8125rem;
  }
}
</style>
