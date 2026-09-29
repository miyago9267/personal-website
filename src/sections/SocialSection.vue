<script setup lang="ts">
import { useUi } from '../i18n'
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
const ui = useUi()
const profile = useProfile()
</script>

<template>
  <section
    id="social"
    class="py-4 md:py-8"
  >
    <SectionTitle
      :kicker="ui.social.kicker"
      :title="ui.social.title"
      :subtitle="ui.social.subtitle"
    />
    <div class="my-8 grid gap-6 md:grid-cols-3">
      <a
        v-for="channel in profile.channels"
        :key="channel.title"
        :href="channel.href"
        target="_blank"
        rel="noreferrer"
        class="card-surface rounded-[20px] p-6 transition bg-[var(--card-bg)] shadow-[var(--card-shadow)]"
      >
        <p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{{ channel.title }}</p>
        <p class="mt-3 text-lg text-[var(--text)]">{{ channel.detail }}</p>
        <span class="mt-6 inline-flex text-sm text-[var(--muted)]">{{ ui.social.follow }}</span>
      </a>
    </div>
  </section>
</template>
