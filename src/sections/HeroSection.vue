<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useProfile } from '../composables/useProfile'
const profile = useProfile()

// 彩蛋:職業輪播
const roles = [
  'MUGer',
  'Writer',
  'Programmer',
  '見習魔法使',
  'SRE Engineer',
  '音遊玩家',
  'Full Stack Dev',
  '幻想鄉住民'
]
const currentRoleIndex = ref(0)
let roleInterval: number | null = null

onMounted(() => {
  roleInterval = window.setInterval(() => {
    currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
  }, 3000)
})

onUnmounted(() => {
  if (roleInterval) clearInterval(roleInterval)
})
</script>

<template>
  <section
    class="hero-section relative min-h-[calc(100svh-var(--header-height))] flex flex-col items-center justify-start text-center pt-[calc(30svh-var(--header-height))] pb-6 lt-sm:pt-[calc(35svh-var(--header-height))]"
  >
    <span
      class="hidden lt-sm:block absolute -top-2 left-0 right-0 h-[60px] bg-[radial-gradient(circle,rgba(186,142,166,0.35)_1px,transparent_1.5px)] bg-[size:12px_12px] opacity-60 pointer-events-none"
    />
    <div class="relative z-10 flex flex-col items-center w-full gap-3 lt-sm:gap-1.5">
      <p
        class="text-[1.25rem] md:text-[4.5rem] lt-sm:text-[clamp(18px,6.6vw,30px)] tracking-[0.02em] lt-sm:tracking-[-0.015em] font-['JetBrains_Mono'] text-[var(--hero-strong)] whitespace-nowrap inline-block max-w-full my-4"
      >
        Hello World, Miyago here
      </p>
      <p class="text-[1.125rem] md:text-[2rem] lt-sm:text-[clamp(18px,5vw,24px)] font-['JetBrains_Mono'] text-[var(--hero-soft)] my-2">
        <Transition name="role-fade" mode="out-in">
          <span :key="currentRoleIndex">{{ roles[currentRoleIndex] }}</span>
        </Transition>
      </p>
      <p class="text-[0.9rem] lt-sm:text-[clamp(14px,4vw,16px)] text-[var(--hero-sub)]">
        {{ profile.tagline }}
      </p>
    </div>
    <span
      class="relative z-10 mt-6 text-[12px] tracking-[0.2em] uppercase text-[var(--muted)] lt-sm:mt-4"
    >
      Scroll ↓
    </span>
  </section>
</template>

<style scoped>
/* 彩蛋:職業輪播動畫 */
.role-fade-enter-active,
.role-fade-leave-active {
  transition: all 0.5s ease;
}

.role-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.role-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

