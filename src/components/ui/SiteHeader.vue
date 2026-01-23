<script setup lang="ts">
import { onMounted, ref } from 'vue'
import site from '../../data/site.json'

const navLinks = site.navLinks
const isDark = ref(true)

const isOpen = ref(false)

const toggleNav = () => {
  isOpen.value = !isOpen.value
}

const closeNav = () => {
  isOpen.value = false
}

const setTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
  isDark.value = theme === 'dark'
}

const toggleTheme = () => {
  const next = isDark.value ? 'light' : 'dark'
  setTheme(next)
}

onMounted(() => {
  const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
  if (stored) {
    setTheme(stored)
    return
  }
  setTheme('light')
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <div class="site-header__brand">
        <span class="site-header__tag">MIYAGO</span>
        <span class="site-header__title">Personal Media</span>
      </div>
      <nav class="site-header__nav">
        <a
          v-for="item in navLinks"
          :key="item.href"
          :href="item.href"
          class="site-header__link"
          @click="closeNav"
        >
          {{ item.label }}
        </a>
      </nav>
      <div class="site-header__actions">
        <button
          class="site-header__theme"
          type="button"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="isDark" aria-hidden="true" viewBox="0 0 24 24" class="site-header__icon">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path
              d="M12 3v2M12 19v2M5.64 5.64l1.4 1.4M16.96 16.96l1.4 1.4M3 12h2M19 12h2M5.64 18.36l1.4-1.4M16.96 7.04l1.4-1.4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <svg v-else aria-hidden="true" viewBox="0 0 24 24" class="site-header__icon">
            <path
              d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button class="site-header__toggle" type="button" @click="toggleNav">
          <span class="site-header__hamburger" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <div v-if="isOpen" class="site-header__overlay" @click="closeNav">
      <nav class="site-header__drawer" @click.stop>
        <div class="site-header__drawer-header">
          <span class="site-header__title">Menu</span>
          <button class="site-header__toggle" type="button" @click="closeNav">✕</button>
        </div>
        <a
          v-for="item in navLinks"
          :key="item.href"
          :href="item.href"
          class="site-header__mobile-link"
          @click="closeNav"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--header-bg);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--header-border);
  animation: fade-down 0.5s var(--ease);
  min-height: var(--header-height);
}

.site-header__inner {
  width: min(1120px, 92vw);
  margin: 0 auto;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}

.site-header__brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.site-header__tag {
  font-size: 11px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--muted);
}

.site-header__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.site-header__nav {
  display: none;
  gap: 18px;
  font-size: 13px;
  color: var(--muted);
  overflow-x: auto;
  padding-bottom: 4px;
  margin-left: auto;
}

.site-header__link:hover {
  color: var(--text);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 6px;
}

.site-header__theme,
.site-header__toggle {
  background: transparent;
  border: 1px solid var(--card-border);
  color: var(--muted);
  border-radius: 999px;
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.site-header__theme:hover,
.site-header__toggle:hover {
  color: var(--text);
}

.site-header__icon {
  width: 16px;
  height: 16px;
}

.site-header__hamburger {
  width: 16px;
  height: 2px;
  background: currentColor;
  display: block;
  position: relative;
}

.site-header__hamburger::before,
.site-header__hamburger::after {
  content: '';
  position: absolute;
  left: 0;
  width: 16px;
  height: 2px;
  background: currentColor;
}

.site-header__hamburger::before {
  top: -6px;
}

.site-header__hamburger::after {
  top: 6px;
}

.site-header__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  justify-content: end;
  z-index: 30;
}

.site-header__drawer {
  width: min(280px, 80vw);
  height: 100vh;
  background: var(--panel-bg);
  border-left: 1px solid var(--panel-border);
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: -16px 0 30px rgba(0, 0, 0, 0.2);
  animation: slide-in 0.25s var(--ease);
}

.site-header__drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--header-border);
}

.site-header__mobile-link {
  color: var(--muted);
  padding: 6px 0;
}

.site-header__mobile-link:hover {
  color: var(--text);
}

@media (min-width: 960px) {
  .site-header__nav {
    display: flex;
    padding-bottom: 0;
  }

  .site-header__toggle {
    display: none;
  }
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
