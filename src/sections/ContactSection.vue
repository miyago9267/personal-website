<script setup lang="ts">
import profile from '../data/profile.json'
import SectionTitle from '../components/ui/SectionTitle.vue'
import ButtonLink from '../components/ui/ButtonLink.vue'
</script>

<template>
  <section id="contact" class="py-4 md:py-8">
    <div class="card rounded-[24px] p-8 md:p-12">
      <SectionTitle kicker="Contact" :title="profile.contact.title" :subtitle="profile.contact.body" />
      <div class="mt-8 flex flex-wrap items-center gap-4">
        <ButtonLink :label="profile.contact.ctaLabel" :href="profile.contact.ctaHref" />
        <div class="flex flex-wrap gap-3 text-sm text-gray-300/70">
          <a
            v-for="social in profile.socials"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noreferrer"
            class="contact-link"
          >
            {{ social.name }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-link {
  border-radius: 999px;
  border: 1px solid var(--card-border);
  padding: 6px 16px;
  transition: color 0.2s ease, border-color 0.2s ease;
  color: var(--muted);
}

.contact-link:hover {
  color: var(--text);
  border-color: var(--card-border);
}
</style>
