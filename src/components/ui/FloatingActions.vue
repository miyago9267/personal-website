<script setup lang="ts">
import { useProfile } from '../../composables/useProfile'

import { useScrollToTop } from '../../composables/useScrollToTop'

const profile = useProfile()

const { showTop, scrollToTop } = useScrollToTop(120)

const labelMap: Record<string, string> = {
  GitHub: 'GH',
  Facebook: 'FB',
  Discord: 'DC',
}

const socialItems = profile.socials.map((item) => {
  const label = labelMap[item.name] ?? item.name.slice(0, 2).toUpperCase()
  return { ...item, label }
})

</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-20">
    <div
      class="absolute left-6 bottom-6 grid gap-2.5 pointer-events-auto lt-[720px]:left-4 lt-[720px]:bottom-12 lt-[720px]:grid-flow-col lt-[720px]:grid-cols-3"
    >
      <a
        v-for="item in socialItems"
        :key="item.name"
        :href="item.href"
        target="_blank"
        rel="noreferrer"
        class="w-9 h-9 rounded-full text-[11px] text-[var(--muted)] flex items-center justify-center font-['JetBrains_Mono'] bg-[var(--card-bg)] shadow-[var(--card-shadow)] transition transform hover:(text-[var(--text)] -translate-y-0.5)"
        :aria-label="item.name"
      >
        {{ item.label }}
      </a>
      <span class="block w-px h-[120px] mx-auto bg-[var(--card-border)] lt-[720px]:hidden" />
    </div>
    <button
      v-show="showTop"
      class="absolute right-6 bottom-6 w-11 h-11 rounded-full bg-[var(--card-bg)] text-[16px] text-[var(--muted)] shadow-[var(--card-shadow)] cursor-pointer pointer-events-auto transition transform hover:(text-[var(--text)] -translate-y-0.5) lt-[720px]:right-4 lt-[720px]:bottom-4"
      type="button"
      @click="scrollToTop"
    >
      ↑
    </button>
  </div>
</template>
