<script setup lang="ts">
import { ref } from 'vue'
import { useUi } from '../i18n'
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
const ui = useUi()
const profile = useProfile()
const failedIcons = ref(new Set<string>())
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
          class="group card-surface rounded-[18px] p-5 text-[var(--text)]/90 transition bg-[var(--card-bg)] shadow-[var(--card-shadow)]"
        >
          <div class="flex items-center gap-3">
            <img
              v-if="item.icon && !failedIcons.has(item.name)"
              :src="item.icon"
              alt=""
              loading="lazy"
              referrerpolicy="no-referrer"
              class="size-10 shrink-0 rounded-xl object-cover bg-[var(--panel-bg)] transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
              @error="failedIcons.add(item.name)"
            >
            <div
              v-else
              class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--panel-bg)] font-mono text-base uppercase text-[var(--muted)] transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
            >
              {{ item.name.charAt(0) }}
            </div>
            <p class="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">{{ item.name }}</p>
          </div>
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
