<script setup lang="ts">
import { ref } from 'vue'
import { useSite } from '../../composables/useSite'
import { useDisclosure } from '../../composables/useDisclosure'
import { useTheme } from '../../composables/useTheme'

const { navLinks } = useSite()
const { isDark, toggleTheme } = useTheme('light')

const { isOpen, toggle: toggleNav, close: closeNav } = useDisclosure(false)

const isThemeAnimating = ref(false)
const themeAnimMode = ref<'sunrise' | 'sunset'>('sunrise')

const triggerThemeAnim = (mode: 'sunrise' | 'sunset') => {
  themeAnimMode.value = mode
  isThemeAnimating.value = true
  setTimeout(() => {
    isThemeAnimating.value = false
  }, 700)
}

const handleThemeToggle = () => {
  triggerThemeAnim(isDark.value ? 'sunrise' : 'sunset')
  toggleTheme()
}
</script>

<template>
  <header
    class="sticky top-0 z-10 bg-[var(--header-bg)] backdrop-blur-sm min-h-[var(--header-height)] animate-[fade-down_0.5s_var(--ease)]"
  >
    <div
      v-if="isThemeAnimating"
      class="fixed inset-0 z-[999] pointer-events-none"
      :class="themeAnimMode === 'sunrise' ? 'theme-wipe theme-wipe--sunrise' : 'theme-wipe theme-wipe--sunset'"
    ></div>
    <div class="w-[min(1120px,92vw)] mx-auto py-4 flex items-center gap-4 justify-start">
      <div class="flex flex-col gap-1">
        <span class="text-[11px] tracking-[0.4em] uppercase text-[var(--muted)]">MIYAGO</span>
        <span class="text-[16px] font-semibold text-[var(--text)]">Personal Media</span>
      </div>
      <nav class="hidden lg:flex gap-5 text-[13px] text-[var(--muted)] overflow-x-auto pb-1 ml-auto">
        <a
          v-for="item in navLinks"
          :key="item.href"
          :href="item.href"
          class="transition-colors hover:text-[var(--text)]"
          @click="closeNav"
        >
          {{ item.label }}
        </a>
      </nav>
      <div class="flex items-center gap-2 ml-auto lg:ml-3">
        <button
          class="w-8 h-8 rounded-full bg-[var(--panel-bg)] text-[var(--muted)] flex items-center justify-center transition-colors shadow-[var(--card-shadow)] hover:text-[var(--text)] hover:bg-[var(--card-bg)]"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="handleThemeToggle"
        >
          <svg
            v-if="isDark"
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="w-4 h-4"
          >
            <circle
              cx="12"
              cy="12"
              r="4"
              fill="currentColor"
            />
            <path
              d="M12 3v2M12 19v2M5.64 5.64l1.4 1.4M16.96 16.96l1.4 1.4M3 12h2M19 12h2M5.64 18.36l1.4-1.4M16.96 7.04l1.4-1.4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <svg
            v-else
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="w-4 h-4"
          >
            <path
              d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          class="w-8 h-8 rounded-full bg-[var(--panel-bg)] text-[var(--muted)] flex items-center justify-center transition-colors shadow-[var(--card-shadow)] lg:hidden hover:text-[var(--text)] hover:bg-[var(--card-bg)]"
          type="button"
          @click="toggleNav"
        >
          <span
            class="flex flex-col gap-1"
            aria-hidden="true"
          >
            <span class="block h-[2px] w-4 bg-current" />
            <span class="block h-[2px] w-4 bg-current" />
            <span class="block h-[2px] w-4 bg-current" />
          </span>
        </button>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/35 grid justify-end z-30"
      @click="closeNav"
    >
      <nav
        class="w-[min(280px,80vw)] h-screen bg-[var(--panel-bg)] p-4 grid gap-3 shadow-[-16px_0_30px_rgba(0,0,0,0.2)] animate-[slide-in_0.25s_var(--ease)]"
        @click.stop
      >
        <div class="flex items-center justify-between pb-2">
          <span class="text-[16px] font-semibold text-[var(--text)]">Menu</span>
          <button
            class="w-8 h-8 rounded-full bg-[var(--panel-bg)] text-[var(--muted)] flex items-center justify-center transition-colors shadow-[var(--card-shadow)] hover:text-[var(--text)] hover:bg-[var(--card-bg)]"
            type="button"
            @click="closeNav"
          >
            ✕
          </button>
        </div>
        <a
          v-for="item in navLinks"
          :key="item.href"
          :href="item.href"
          class="text-[var(--muted)] hover:text-[var(--text)] py-1"
          @click="closeNav"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
