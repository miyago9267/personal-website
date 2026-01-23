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
    <span class="uppercase tracking-[0.3em] text-xs text-gray-300/80">{{ kicker }}</span>
    <h2 class="text-3xl md:text-5xl font-semibold text-gray-50">{{ title }}</h2>
    <p v-if="subtitle" class="text-base md:text-lg text-gray-300/70 max-w-2xl my-2 ml-2">{{ subtitle }}</p>
  </div>
</template>
