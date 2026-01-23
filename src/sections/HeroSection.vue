<script setup lang="ts">
import { useProfile } from '../composables/useProfile'
const profile = useProfile()

</script>

<template>
  <section
    class="relative min-h-[calc(100vh-var(--header-height))] flex flex-col items-center justify-center text-center py-6 translate-y-[var(--hero-offset)] lt-sm:py-4 lt-sm:pb-8"
  >
    <span
      class="hidden lt-sm:block absolute -top-2 left-0 right-0 h-[60px] bg-[radial-gradient(circle,rgba(186,142,166,0.35)_1px,transparent_1.5px)] bg-[size:12px_12px] opacity-60 pointer-events-none"
    />
    <div class="relative z-10 flex flex-col items-center w-full gap-3 lt-sm:gap-1.5">
      <p
        class="text-[1.25rem] md:text-[4.5rem] lt-sm:text-[clamp(18px,6.6vw,30px)] tracking-[0.02em] lt-sm:tracking-[-0.015em] font-['JetBrains_Mono'] text-[var(--hero-strong)] whitespace-nowrap inline-block max-w-full my-4"
      >
        Hello World, Miyago here
      </p>
      <p class="text-[1.125rem] md:text-[2rem] lt-sm:text-[clamp(18px,5vw,24px)] font-['JetBrains_Mono'] text-[var(--hero-soft)] my-2">
        MUGer × Writer × Programmer
      </p>
      <p class="text-[0.9rem] lt-sm:text-[clamp(14px,4vw,16px)] text-[var(--hero-sub)]">
        {{ profile.tagline }}
      </p>
    </div>
    <span
      class="relative z-10 mt-6 text-[12px] tracking-[0.2em] uppercase text-[var(--muted)] lt-sm:mt-auto lt-sm:pb-3"
    >
      Scroll ↓
    </span>
  </section>
</template>
