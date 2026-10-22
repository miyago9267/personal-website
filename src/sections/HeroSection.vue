<script setup lang="ts">
import { useUi } from '../i18n'
import { ref, watch, onUnmounted } from 'vue'
import { useProfile } from '../composables/useProfile'
import { isLoading } from '../composables/useLoading'
import { useTextScramble } from '../composables/useTextScramble'
const ui = useUi()
const profile = useProfile()

const TYPE_INTERVAL = 55
const ROLE_INTERVAL = 3000

const greetingChars = Array.from(ui.hero.greeting)
const typedCount = ref(0)
const isTyped = ref(false)

// 彩蛋:職業輪播（亂碼解析）
const roles = profile.roles
const currentRoleIndex = ref(0)
const { text: roleText, scrambleTo, set: setRole } = useTextScramble(roles[0])
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let typeTimer: ReturnType<typeof setInterval> | undefined
let roleTimer: ReturnType<typeof setInterval> | undefined

const startRoles = () => {
  roleTimer = setInterval(() => {
    currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
    const next = roles[currentRoleIndex.value]
    if (reduceMotion) setRole(next)
    else scrambleTo(next)
  }, ROLE_INTERVAL)
}

const finishTyping = () => {
  clearInterval(typeTimer)
  typedCount.value = greetingChars.length
  isTyped.value = true
  startRoles()
}

// 載入畫面結束後才開始打字
watch(
  isLoading,
  (loading) => {
    if (loading || isTyped.value || typeTimer) return
    if (reduceMotion) return finishTyping()
    typeTimer = setInterval(() => {
      typedCount.value++
      if (typedCount.value >= greetingChars.length) finishTyping()
    }, TYPE_INTERVAL)
  },
  { immediate: true }
)

onUnmounted(() => {
  clearInterval(typeTimer)
  clearInterval(roleTimer)
})
</script>

<template>
  <section
    class="hero-section relative overflow-x-clip min-h-[calc(100svh-var(--header-height))] flex flex-col items-center justify-start text-center pt-[calc(30svh-var(--header-height))] pb-6 lt-sm:pt-[calc(35svh-var(--header-height))]"
  >
    <span
      class="absolute z-0 top-[8%] left-[8%] size-[340px] rounded-full bg-[rgba(186,142,166,0.8)] blur-[70px] opacity-35 dark:opacity-16 pointer-events-none animate-[blob-drift-a_18s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
      aria-hidden="true"
    />
    <span
      class="absolute z-0 top-[28%] right-[8%] size-[340px] rounded-full bg-[rgba(142,166,186,0.8)] blur-[70px] opacity-35 dark:opacity-16 pointer-events-none animate-[blob-drift-b_22s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
      aria-hidden="true"
    />
    <span
      class="hidden lt-sm:block absolute -top-2 left-0 right-0 h-[60px] bg-[radial-gradient(circle,rgba(186,142,166,0.35)_1px,transparent_1.5px)] bg-[size:12px_12px] opacity-60 pointer-events-none"
    />
    <div class="relative z-10 flex flex-col items-center w-full gap-3 lt-sm:gap-1.5">
      <p
        class="relative text-[1.25rem] md:text-[4.5rem] lt-sm:text-[clamp(18px,6.6vw,30px)] tracking-[0.02em] lt-sm:tracking-[-0.015em] font-['JetBrains_Mono'] text-[var(--hero-strong)] whitespace-nowrap inline-block max-w-full my-4"
      >
        <!-- 完整文字隱形佔位，打字期間版面不跳動；螢幕閱讀器讀這一份 -->
        <span class="invisible">{{ ui.hero.greeting }}</span>
        <span
          class="absolute left-0 top-0"
          aria-hidden="true"
        >{{ greetingChars.slice(0, typedCount).join('') }}<span
          v-if="!isTyped && !isLoading"
          class="inline-block w-[0.08em] h-[0.9em] ml-[0.05em] align-text-bottom bg-current"
        /></span>
      </p>
      <p
        class="text-[1.125rem] md:text-[2rem] lt-sm:text-[clamp(18px,5vw,24px)] font-['JetBrains_Mono'] text-[var(--hero-soft)] my-2 transition-opacity duration-500 motion-reduce:transition-none"
        :class="isTyped ? 'opacity-100' : 'opacity-0'"
      >
        <span class="sr-only">{{ roles[currentRoleIndex] }}</span>
        <span aria-hidden="true">{{ roleText }}</span>
        <span
          class="inline-block w-0.5 h-[1em] ml-1 align-text-bottom bg-current animate-[caret-blink_1s_steps(1)_infinite] motion-reduce:animate-none"
          aria-hidden="true"
        />
      </p>
      <p class="text-[0.9rem] lt-sm:text-[clamp(14px,4vw,16px)] text-[var(--hero-sub)]">
        {{ profile.tagline }}
      </p>
    </div>
    <span
      class="inline-block animate-[hint-bob_2.4s_ease-in-out_infinite] motion-reduce:animate-none relative z-10 mt-6 text-[12px] tracking-[0.2em] uppercase text-[var(--muted)] lt-sm:mt-4"
    >
      {{ ui.hero.scroll }}
    </span>
  </section>
</template>
