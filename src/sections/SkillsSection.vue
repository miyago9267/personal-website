<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
import Tag from '../components/ui/Tag.vue'
const profile = useProfile()

// 彩蛋：技能點擊連擊計數器
const clickCombo = ref(0)
const lastClickTime = ref(0)
const comboTimeout = ref<number | null>(null)

const comboMessage = computed(() => {
  if (clickCombo.value >= 50) return '究極技能樹亂點人！'
  if (clickCombo.value >= 30) return '全能工程師！'
  if (clickCombo.value >= 20) return 'Full Stack Master!'
  if (clickCombo.value >= 10) return '技能收集家'
  if (clickCombo.value >= 5) return 'Combo!'
  return ''
})

const handleSkillClick = () => {
  const now = Date.now()
  
  // 如果距離上次點擊超過 2 秒，重置連擊
  if (now - lastClickTime.value > 2000) {
    clickCombo.value = 0
  }
  
  clickCombo.value++
  lastClickTime.value = now
  
  // 清除舊的 timeout
  if (comboTimeout.value) {
    clearTimeout(comboTimeout.value)
  }
  
  // 3 秒後重置連擊
  comboTimeout.value = window.setTimeout(() => {
    clickCombo.value = 0
  }, 3000)
}
</script>

<template>
  <section
    id="skills"
    class="py-4 md:py-8"
  >
    <SectionTitle
      kicker="Skills"
      title="技術棧"
      subtitle="從系統底層到使用者介面，從演算法到 AI 應用。"
    />

    <!-- 彩蛋：連擊計數器顯示 -->
    <Transition name="combo-fade">
      <div
        v-if="clickCombo > 0"
        class="combo-display"
      >
        <span class="combo-count">{{ clickCombo }} Combo</span>
        <span
          v-if="comboMessage"
          class="combo-message"
        >{{ comboMessage }}</span>
      </div>
    </Transition>

    <div class="my-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="skillGroup in profile.skills"
        :key="skillGroup.category"
        class="card-surface rounded-[20px] p-6 flex flex-col gap-4 bg-[var(--card-bg)] shadow-[var(--card-shadow)]"
      >
        <div>
          <h3 class="text-xl text-[var(--text)] font-semibold">
            {{ skillGroup.category }}
          </h3>
          <p class="mt-2 text-sm text-[var(--muted)]">
            {{ skillGroup.description }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="item in skillGroup.items"
            :key="item"
            :label="item"
            @click="handleSkillClick"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* 卡片基礎樣式 */
.card-surface {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 卡片 hover 效果 */
.card-surface:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

/* 卡片背景漸變效果 */
.card-surface::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    rgba(186, 142, 166, 0.6),
    rgba(142, 166, 186, 0.6),
    rgba(166, 186, 142, 0.6)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-surface:hover::before {
  opacity: 1;
}

/* 技能標籤增強 */
:deep(.tag) {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

:deep(.tag:hover) {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 分類標題動畫 */
h3 {
  transition: color 0.3s ease;
}

.card-surface:hover h3 {
  color: rgba(var(--text-rgb, 0, 0, 0), 1);
}

/* 描述文字 */
p {
  transition: color 0.3s ease;
}

.card-surface:hover p {
  color: rgba(var(--text-rgb, 0, 0, 0), 0.75);
}

/* 技能標籤容器動畫 */
.flex.flex-wrap {
  position: relative;
}

/* 響應式調整 */
@media (max-width: 768px) {
  .card-surface:hover {
    transform: translateY(-2px);
  }
}

/* 彩蛋：連擊計數器樣式 */
.combo-display {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
}

.combo-count {
  font-size: 3rem;
  font-weight: 900;
  font-family: 'JetBrains Mono', monospace;
  background: linear-gradient(
    135deg,
    rgba(186, 142, 166, 1),
    rgba(142, 166, 186, 1),
    rgba(166, 186, 142, 1)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(186, 142, 166, 0.3);
  animation: combo-pulse 0.3s ease-out;
}

.combo-message {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  opacity: 0.9;
  animation: combo-slide-up 0.4s ease-out;
}

@keyframes combo-pulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes combo-slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.combo-fade-enter-active,
.combo-fade-leave-active {
  transition: opacity 0.3s ease;
}

.combo-fade-enter-from,
.combo-fade-leave-to {
  opacity: 0;
}
</style>

