<script setup lang="ts">
import { onMounted, ref } from 'vue'
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

const isLoading = ref(true)

onMounted(() => {
  const min = 2200
  const max = 3800
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  setTimeout(() => {
    isLoading.value = false
  }, delay)
})
</script>

<template>
  <div class="page-shell">
    <LoadingScreen v-if="isLoading" />
    <SiteHeader />
    <main class="page-content">
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
