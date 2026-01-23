<script setup lang="ts">
interface SectionTitleProps {
  kicker: string
  title: string
  subtitle?: string
}

defineProps<SectionTitleProps>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <span class="uppercase tracking-[0.3em] text-xs text-[var(--muted)]">{{ kicker }}</span>
    <h2 class="text-3xl md:text-5xl font-semibold text-[var(--text)]">
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="text-base md:text-lg text-[var(--muted)] max-w-2xl my-2 ml-2"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
