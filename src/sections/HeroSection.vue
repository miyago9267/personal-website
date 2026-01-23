<script setup lang="ts">
import profile from '../data/profile.json'
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <p class="hero__kicker">Hello World, Miyago here</p>
      <p class="hero__title">MUGer × Writer × Programmer</p>
      <p class="hero__subtitle">{{ profile.tagline }}</p>
    </div>
    <span class="hero__hint">Scroll ↓</span>
  </section>
</template>
