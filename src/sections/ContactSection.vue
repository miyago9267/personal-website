<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
import ButtonLink from '../components/ui/ButtonLink.vue'
const profile = useProfile()
</script>

<template>
  <section
    id="contact"
    class="py-4 md:py-8"
  >
    <div class="card-surface rounded-[24px] p-8 md:p-12 bg-[var(--card-bg)] shadow-[var(--card-shadow)]">
      <SectionTitle
        kicker="Contact"
        :title="profile.contact.title"
        :subtitle="profile.contact.body"
      />
      <div class="mt-8 flex flex-wrap items-center gap-4">
        <ButtonLink
          :label="profile.contact.ctaLabel"
          :href="profile.contact.ctaHref"
        />
        <div class="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
          <a
            v-for="social in profile.socials"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noreferrer"
            class="rounded-full px-4 py-1.5 text-[var(--muted)] bg-[var(--panel-bg)] shadow-[var(--card-shadow)] transition hover:text-[var(--text)]"
          >
            {{ social.name }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
