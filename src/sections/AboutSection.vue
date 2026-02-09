<script setup lang="ts">
import { ref } from 'vue'
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
import Tag from '../components/ui/Tag.vue'
const profile = useProfile()

// 彩蛋:雙擊頭像顯示隱藏訊息
const showSecret = ref(false)
const secretMessage = '其實我是住在幻想鄉的見習魔法使'

const handleAvatarDblClick = () => {
  showSecret.value = true
  setTimeout(() => {
    showSecret.value = false
  }, 3000)
}
</script>

<template>
  <section
    id="about"
    class="py-4 md:py-8 lt-sm:mb-10"
  >
    <div class="grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
      <div class="flex flex-col gap-6 md:col-start-2 md:row-start-1">
        <SectionTitle
          kicker="About"
          title="腳踏文學和理學的怪人"
        />
      </div>

      <div class="relative md:col-start-1 md:row-start-1 md:row-span-2">
        <div class="card-surface rounded-[24px] p-6 md:p-8 bg-[var(--card-bg)] shadow-[var(--card-shadow)]">
          <img
            :src="profile.avatarUrl"
            alt="Miyago avatar"
            class="w-full rounded-2xl object-cover opacity-90 cursor-pointer transition-transform hover:scale-105"
            @dblclick="handleAvatarDblClick"
          >
          <!-- 彩蛋:隱藏訊息 -->
          <Transition name="secret-fade">
            <div
              v-if="showSecret"
              class="secret-message"
            >
              {{ secretMessage }}
            </div>
          </Transition>
        </div>
      </div>

      <div class="flex flex-col gap-4 text-[var(--muted)] text-base md:text-lg leading-relaxed md:col-start-2 md:row-start-2">
        <p
          v-for="line in profile.bio"
          :key="line"
        >
          {{ line }}
        </p>
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

<style scoped>
/* 彩蛋:隱藏訊息樣式 */
.secret-message {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(var(--text-rgb, 0, 0, 0), 0.9);
  color: var(--bg);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: secret-bounce 0.5s ease-out;
}

@keyframes secret-bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

.secret-fade-enter-active,
.secret-fade-leave-active {
  transition: opacity 0.3s ease;
}

.secret-fade-enter-from,
.secret-fade-leave-to {
  opacity: 0;
}
</style>

