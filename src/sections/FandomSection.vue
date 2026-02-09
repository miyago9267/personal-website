<script setup lang="ts">
import { ref } from 'vue'
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
import Modal from '../components/ui/Modal.vue'
import { useGalleryModal } from '../composables/useGalleryModal'

const profile = useProfile()
type FandomItem = {
  name: string
  summary: string
  details: string[]
  images?: string[]
}

const { activeItem, activeIndex, hasImages, open, close, prev, next } = useGalleryModal<FandomItem>()

// 彩蛋:音遊連擊效果
const clickTimes = ref<number[]>([])
const showPerfect = ref(false)

const handleCardClick = () => {
  const now = Date.now()
  clickTimes.value.push(now)
  
  // 只保留最近 1 秒內的點擊
  clickTimes.value = clickTimes.value.filter(t => now - t < 1000)
  
  // 如果 1 秒內點擊 5 次以上，觸發 PERFECT
  if (clickTimes.value.length >= 5) {
    showPerfect.value = true
    clickTimes.value = []
    
    setTimeout(() => {
      showPerfect.value = false
    }, 1500)
  }
}
</script>

<template>
  <section
    id="fandoms"
    class="py-4 md:py-8"
  >
    <SectionTitle
      kicker="Fandom"
      title="坑單"
      subtitle="我在活網的足跡裡所銘刻的光陰。"
    />
    <div class="my-8 grid gap-6 md:grid-cols-3">
      <div
        v-for="group in profile.fandoms"
        :key="group.title"
        class="card-surface rounded-[20px] p-6 bg-[var(--card-bg)] shadow-[var(--card-shadow)] cursor-pointer"
        @click="handleCardClick"
      >
        <h2 class="text-lg font-semibold text-[var(--text)]">
          {{ group.title }}
        </h2>
        <div class="mt-4 grid gap-3 text-[var(--text)]/80">
          <div
            v-for="item in group.items"
            :key="item.name"
            class="flex items-center justify-between gap-3"
          >
            <span>{{ item.name }}</span>
            <button
              class="rounded-full px-3 py-1 text-[12px] text-[var(--muted)] bg-[var(--panel-bg)] shadow-[var(--card-shadow)] transition hover:text-[var(--text)]"
              type="button"
              @click="open(item)"
            >
              查看
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-if="activeItem"
      :is-open="!!activeItem"
      :title="activeItem.name"
      @close="close"
    >
      <p class="text-sm text-[var(--muted)]">
        {{ activeItem.summary }}
      </p>
      
      <!-- 分離一般說明和列表項目 -->
      <template v-if="activeItem.details">
        <!-- 一般說明文字 -->
        <ul class="mt-4 grid gap-2 text-sm text-[var(--muted)]">
          <li
            v-for="detail in activeItem.details.filter(d => d && !d.includes('、') && d !== '部分作品列表:')"
            :key="detail"
          >
            {{ detail }}
          </li>
        </ul>
        
        <!-- 可滾動的作品列表區塊 -->
        <div
          v-if="activeItem.details.some(d => d.includes('、'))"
          class="anime-list-container"
        >
          <div class="anime-list-header">部分作品列表</div>
          <div class="anime-list-scroll">
            <div class="anime-list-grid">
              <template v-for="detail in activeItem.details.filter(d => d.includes('、'))" :key="detail">
                <span
                  v-for="anime in detail.split('、')"
                  :key="anime"
                  class="anime-tag"
                >
                  {{ anime }}
                </span>
              </template>
            </div>
          </div>
        </div>
      </template>
      <div
        v-if="hasImages"
        class="mt-4 grid grid-cols-[auto_1fr_auto] gap-3 items-center lt-sm:grid-cols-1"
      >
        <button
          class="w-9 h-9 rounded-full bg-[var(--card-bg)] text-[var(--muted)] shadow-[var(--card-shadow)] transition hover:text-[var(--text)] disabled:opacity-40 disabled:cursor-not-allowed lt-sm:w-full lt-sm:h-8"
          type="button"
          :disabled="activeIndex === 0"
          @click="prev"
        >
          ←
        </button>
        <div class="overflow-hidden rounded-[12px] bg-black/10">
          <div
            class="flex transition-transform duration-[350ms] ease-[var(--ease)]"
            :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
          >
            <div
              v-for="img in activeItem.images"
              :key="img"
              class="min-w-full"
            >
              <img
                :src="img"
                :alt="activeItem.name"
                class="w-full h-[360px] lt-sm:h-[240px] object-contain block bg-black/20"
              >
            </div>
          </div>
        </div>
        <button
          class="w-9 h-9 rounded-full bg-[var(--card-bg)] text-[var(--muted)] shadow-[var(--card-shadow)] transition hover:text-[var(--text)] disabled:opacity-40 disabled:cursor-not-allowed lt-sm:w-full lt-sm:h-8"
          type="button"
          :disabled="activeItem.images ? activeIndex === activeItem.images.length - 1 : true"
          @click="next"
        >
          →
        </button>
      </div>
      <p
        v-if="hasImages"
        class="mt-2 text-[12px] text-[var(--muted)] text-right"
      >
        {{ activeIndex + 1 }} / {{ activeItem.images?.length }}
      </p>
    </Modal>
    
    <!-- 彩蛋:音遊 PERFECT 效果 -->
    <Transition name="perfect-fade">
      <div
        v-if="showPerfect"
        class="perfect-display"
      >
        <div class="perfect-text">PERFECT</div>
        <div class="perfect-subtitle">ALL CRITICAL</div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* 番劇列表容器 */
.anime-list-container {
  margin-top: 1rem;
  border: 1px solid rgba(var(--text-rgb, 0, 0, 0), 0.1);
  border-radius: 12px;
  overflow: hidden;
  background: rgba(var(--text-rgb, 0, 0, 0), 0.02);
}

.anime-list-header {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
  background: rgba(var(--text-rgb, 0, 0, 0), 0.05);
  border-bottom: 1px solid rgba(var(--text-rgb, 0, 0, 0), 0.1);
}

.anime-list-scroll {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
}

.anime-list-grid {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.anime-tag {
  display: block;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: var(--text);
  background: transparent;
  border-bottom: 1px solid rgba(var(--text-rgb, 0, 0, 0), 0.06);
  transition: all 0.2s ease;
  cursor: default;
}

.anime-tag:last-child {
  border-bottom: none;
}

.anime-tag:hover {
  background: rgba(var(--text-rgb, 0, 0, 0), 0.05);
  padding-left: 1rem;
}

/* 自訂滾動條樣式 */
.anime-list-scroll::-webkit-scrollbar {
  width: 6px;
}

.anime-list-scroll::-webkit-scrollbar-track {
  background: rgba(var(--text-rgb, 0, 0, 0), 0.05);
  border-radius: 3px;
}

.anime-list-scroll::-webkit-scrollbar-thumb {
  background: rgba(var(--text-rgb, 0, 0, 0), 0.2);
  border-radius: 3px;
  transition: background 0.3s ease;
}

.anime-list-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--text-rgb, 0, 0, 0), 0.3);
}

/* Firefox 滾動條樣式 */
.anime-list-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--text-rgb, 0, 0, 0), 0.2) rgba(var(--text-rgb, 0, 0, 0), 0.05);
}

/* 彩蛋:音遊 PERFECT 效果 */
.perfect-display {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  pointer-events: none;
  text-align: center;
}

.perfect-text {
  font-size: 4rem;
  font-weight: 900;
  font-family: 'JetBrains Mono', monospace;
  background: linear-gradient(
    135deg,
    #FFD700,
    #FFA500,
    #FF6B6B
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  animation: perfect-burst 0.6s ease-out;
  letter-spacing: 0.1em;
}

.perfect-subtitle {
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFD700;
  margin-top: 0.5rem;
  animation: perfect-slide 0.6s ease-out;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

@keyframes perfect-burst {
  0% {
    transform: scale(0.5) rotate(-10deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.3) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@keyframes perfect-slide {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.perfect-fade-enter-active,
.perfect-fade-leave-active {
  transition: opacity 0.3s ease;
}

.perfect-fade-enter-from,
.perfect-fade-leave-to {
  opacity: 0;
}
</style>

