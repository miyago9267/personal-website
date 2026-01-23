<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import profile from '../../data/profile.json'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const showTop = ref(false)

const handleScroll = () => {
  showTop.value = window.scrollY > 120
}

const labelMap: Record<string, string> = {
  GitHub: 'GH',
  Facebook: 'FB',
  Discord: 'DC',
}

const socialItems = profile.socials.map((item) => {
  const label = labelMap[item.name] ?? item.name.slice(0, 2).toUpperCase()
  return { ...item, label }
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="floating">
    <div class="floating__left">
      <a
        v-for="item in socialItems"
        :key="item.name"
        :href="item.href"
        target="_blank"
        rel="noreferrer"
        class="floating__link"
        :aria-label="item.name"
      >
        {{ item.label }}
      </a>
    </div>
    <button v-show="showTop" class="floating__top" type="button" @click="scrollToTop">
      ↑
    </button>
  </div>
</template>

<style scoped>
.floating {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 20;
}

.floating__left {
  position: absolute;
  left: 24px;
  bottom: 24px;
  display: grid;
  gap: 10px;
  pointer-events: auto;
}

.floating__left::after {
  content: '';
  display: block;
  width: 1px;
  height: 120px;
  margin: 0 auto;
  background-color: var(--card-border);
}

.floating__link {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--card-border);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  background: var(--card-bg);
}

.floating__link:hover {
  color: var(--text);
  border-color: var(--card-border);
  transform: translateY(-2px);
}

.floating__top {
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  color: var(--muted);
  font-size: 16px;
  cursor: pointer;
  pointer-events: auto;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.floating__top:hover {
  color: var(--text);
  border-color: var(--card-border);
  transform: translateY(-2px);
}

@media (max-width: 720px) {
  .floating__left {
    left: 16px;
    bottom: 48px;
    grid-auto-flow: column;
    grid-template-columns: repeat(3, 36px);
  }

  .floating__left::after {
    display: none;
  }

  .floating__top {
    right: 16px;
    bottom: 16px;
  }
}
</style>
