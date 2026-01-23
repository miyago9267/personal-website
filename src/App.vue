<script setup lang="ts">
import { ref } from 'vue'
import { useLoading } from './composables/useLoading'
import { useSectionReveal } from './composables/useSectionReveal'
import SiteHeader from './components/ui/SiteHeader.vue'
import FloatingActions from './components/ui/FloatingActions.vue'
import LoadingScreen from './components/ui/LoadingScreen.vue'
import HeroSection from './sections/HeroSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import FandomSection from './sections/FandomSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import SocialSection from './sections/SocialSection.vue'
import ContactSection from './sections/ContactSection.vue'
import FriendsSection from './sections/FriendsSection.vue'
import FooterSection from './sections/FooterSection.vue'

const { isLoading } = useLoading(2500, 4000)
const mainRef = ref<HTMLElement | null>(null)

useSectionReveal(mainRef)
</script>

<template>
  <div class="page-shell" :class="{ 'is-loading': isLoading }">
    <Transition name="loading-fade">
      <LoadingScreen v-if="isLoading" />
    </Transition>
    <SiteHeader />
    <main ref="mainRef" class="page-content">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <FandomSection />
      <ProjectsSection />
      <SocialSection />
      <ContactSection />
      <FriendsSection />
      <FooterSection />
    </main>
    <FloatingActions />
  </div>
</template>
