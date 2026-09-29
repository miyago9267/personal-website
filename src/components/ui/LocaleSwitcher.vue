<script setup lang="ts">
import { LOCALES, LOCALE_NAMES, switchLocale, useLocale, useUi, type Locale } from '../../i18n'

const ui = useUi()
const current = useLocale()

const handleChange = (event: Event) => {
  const next = (event.target as HTMLSelectElement).value as Locale
  if (next !== current) switchLocale(next)
}
</script>

<template>
  <select
    class="h-8 rounded-full bg-[var(--panel-bg)] font-[inherit] text-[12px] text-[var(--muted)] px-2 shadow-[var(--card-shadow)] cursor-pointer outline-none transition-colors hover:text-[var(--text)] border-none"
    :value="current"
    :aria-label="ui.header.language"
    @change="handleChange"
  >
    <option
      v-for="locale in LOCALES"
      :key="locale"
      :value="locale"
      :lang="locale"
    >
      {{ LOCALE_NAMES[locale] }}
    </option>
  </select>
</template>
