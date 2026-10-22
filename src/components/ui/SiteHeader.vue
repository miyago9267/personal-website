<script setup lang="ts">
import { useUi } from '../../i18n'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSite } from '../../composables/useSite'
import { useDisclosure } from '../../composables/useDisclosure'
import { useTheme } from '../../composables/useTheme'
import LocaleSwitcher from './LocaleSwitcher.vue'
const ui = useUi()

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

// Scroll-spy：只追蹤 href 為 #id 的站內區塊（Blog 等外部連結略過）
const inPageLinks = navLinks.filter((l) => l.href.startsWith('#'))
const navRef = ref<HTMLElement | null>(null)
const linkEls = new Map<string, HTMLElement>()
const activeId = ref<string | null>(null)
const indicator = ref({ left: 0, width: 0 })

const setLinkEl = (id: string, el: unknown) => {
  if (el) linkEls.set(id, el as HTMLElement)
}

const measureIndicator = () => {
  const el = activeId.value ? linkEls.get(activeId.value) : null
  if (el) indicator.value = { left: el.offsetLeft, width: el.offsetWidth }
}

let spy: IntersectionObserver | null = null
let navResize: ResizeObserver | null = null

onMounted(() => {
  const inView = new Set<string>()
  spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? inView.add(e.target.id) : inView.delete(e.target.id)))
      // 視窗中段橫帶內可能同時有兩個區塊，取 DOM 順序最後一個
      activeId.value = [...inPageLinks].reverse().find((l) => inView.has(l.href.slice(1)))?.href.slice(1) ?? null
      measureIndicator()
    },
    { rootMargin: '-35% 0px -50% 0px' }
  )
  inPageLinks.forEach((l) => {
    const section = document.getElementById(l.href.slice(1))
    if (section) spy?.observe(section)
  })

  if (navRef.value && typeof ResizeObserver !== 'undefined') {
    navResize = new ResizeObserver(measureIndicator)
    navResize.observe(navRef.value)
  }
})

onBeforeUnmount(() => {
  spy?.disconnect()
  navResize?.disconnect()
})
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
    <span
      class="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-[linear-gradient(90deg,rgba(186,142,166,0.9),rgba(142,166,186,0.9))] scale-x-0 origin-left pointer-events-none"
      aria-hidden="true"
    />
    <div class="w-[min(1120px,92vw)] mx-auto py-4 flex items-center gap-4 justify-start">
      <div class="flex flex-col gap-1">
        <span class="text-[11px] tracking-[0.4em] uppercase text-[var(--muted)]">{{ ui.header.brandKicker }}</span>
        <span class="text-[16px] font-semibold text-[var(--text)]">{{ ui.header.brandTitle }}</span>
      </div>
      <nav
        ref="navRef"
        class="relative hidden lg:flex gap-5 text-[13px] text-[var(--muted)] overflow-x-auto pb-1.5 ml-auto"
      >
        <a
          v-for="item in navLinks"
          :key="item.href"
          :ref="(el) => setLinkEl(item.href.slice(1), el)"
          :href="item.href"
          class="transition-colors hover:text-[var(--text)]"
          :class="activeId && item.href === '#' + activeId ? 'text-[var(--text)]' : ''"
          @click="closeNav"
        >
          {{ ui.nav[item.id as keyof typeof ui.nav] }}
        </a>
        <span
          class="absolute bottom-0 left-0 h-0.5 rounded-[2px] bg-[linear-gradient(90deg,rgba(186,142,166,0.9),rgba(142,166,186,0.9))] pointer-events-none transition-[left,width,opacity] duration-[400ms] ease-[var(--ease)] motion-reduce:transition-none"
          :class="activeId ? 'opacity-100' : 'opacity-0'"
          :style="{ left: indicator.left + 'px', width: indicator.width + 'px' }"
          aria-hidden="true"
        />
      </nav>
      <div class="flex items-center gap-2 ml-auto lg:ml-3">
        <LocaleSwitcher />
        <button
          class="w-8 h-8 rounded-full bg-[var(--panel-bg)] text-[var(--muted)] flex items-center justify-center transition-colors shadow-[var(--card-shadow)] hover:text-[var(--text)] hover:bg-[var(--card-bg)]"
          type="button"
          :aria-label="isDark ? ui.header.toLight : ui.header.toDark"
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
          <span class="text-[16px] font-semibold text-[var(--text)]">{{ ui.header.menu }}</span>
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
          {{ ui.nav[item.id as keyof typeof ui.nav] }}
        </a>
      </nav>
    </div>
  </header>
</template>
