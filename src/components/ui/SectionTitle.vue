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
    <div class="flex items-center gap-3">
      <span
        class="w-7 h-0.5 rounded-[2px] bg-[linear-gradient(90deg,rgba(186,142,166,0.9),rgba(142,166,186,0.9))] scale-x-0 origin-left transition-transform duration-[800ms] ease-[var(--ease)] delay-150 revealed:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none"
        aria-hidden="true"
      />
      <span class="uppercase tracking-[0.3em] text-sm md:text-base text-[var(--muted)]">{{ kicker }}</span>
    </div>
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
