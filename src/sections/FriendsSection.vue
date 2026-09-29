<script setup lang="ts">
import { useUi } from '../i18n'
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
const ui = useUi()
const profile = useProfile()
</script>

<template>
  <section
    id="friends"
    class="py-4 md:py-8"
  >
    <SectionTitle
      :kicker="ui.friends.kicker"
      :title="ui.friends.title"
      :subtitle="ui.friends.subtitle"
    />
    <div class="my-8">
      <div
        v-if="profile.friendLinks.length"
        class="grid gap-4 md:grid-cols-3"
      >
        <a
          v-for="item in profile.friendLinks"
          :key="item.name"
          :href="item.href"
          target="_blank"
          rel="noreferrer"
          class="card-surface rounded-[18px] p-5 text-[var(--text)]/90 transition bg-[var(--card-bg)] shadow-[var(--card-shadow)]"
        >
          <p class="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">{{ item.name }}</p>
          <p class="mt-3 text-base text-[var(--text)]/80">{{ item.description }}</p>
        </a>
      </div>
      <p
        v-else
        class="text-sm text-[var(--muted)]"
      >
        {{ ui.friends.empty }}
      </p>
    </div>
  </section>
</template>
