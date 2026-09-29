<script setup lang="ts">
import { ref } from 'vue'
import {
  DEFAULT_LOCALE,
  SUGGEST_TEXT,
  readStoredLocale,
  storeLocale,
  suggestLocale,
  switchLocale,
  useLocale,
} from '../../i18n'

// 只在根目錄（zh-TW）且使用者還沒選過語言時提示，不自動轉址
const suggested = ref(
  useLocale() === DEFAULT_LOCALE ? suggestLocale(navigator.languages ?? [navigator.language], readStoredLocale()) : null,
)

const dismiss = () => {
  storeLocale(DEFAULT_LOCALE)
  suggested.value = null
}
</script>

<template>
  <Transition name="suggest-fade">
    <div
      v-if="suggested"
      :lang="suggested"
      class="fixed left-1/2 -translate-x-1/2 bottom-20 z-40 w-[min(92vw,420px)] rounded-[16px] p-4 bg-[var(--panel-bg)] shadow-[var(--card-shadow)] flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text)]"
      role="dialog"
    >
      <span>{{ SUGGEST_TEXT[suggested].message }}</span>
      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-full px-3 py-1 bg-[var(--text)] text-[var(--bg)] font-semibold"
          @click="switchLocale(suggested)"
        >
          {{ SUGGEST_TEXT[suggested].accept }}
        </button>
        <button
          type="button"
          class="rounded-full px-3 py-1 text-[var(--muted)] hover:text-[var(--text)]"
          @click="dismiss"
        >
          {{ SUGGEST_TEXT[suggested].dismiss }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.suggest-fade-enter-active,
.suggest-fade-leave-active {
  transition: opacity 0.3s ease;
}

.suggest-fade-enter-from,
.suggest-fade-leave-to {
  opacity: 0;
}
</style>
