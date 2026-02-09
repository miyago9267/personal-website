<script setup lang="ts">
import { ref } from 'vue'
import { useLoading } from './composables/useLoading'
import { useTheme } from './composables/useTheme'
import { useSectionReveal } from './composables/useSectionReveal'
import { useKonamiCode } from './composables/useKonamiCode'
import SiteHeader from './components/ui/SiteHeader.vue'
import FloatingActions from './components/ui/FloatingActions.vue'
import LoadingScreen from './components/ui/LoadingScreen.vue'
import HeroSection from './sections/HeroSection.vue'
import AboutSection from './sections/AboutSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import FandomSection from './sections/FandomSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import SocialSection from './sections/SocialSection.vue'
import ContactSection from './sections/ContactSection.vue'
import FriendsSection from './sections/FriendsSection.vue'
import FooterSection from './sections/FooterSection.vue'

const { isLoading } = useLoading(2000, 4000)
const mainRef = ref<HTMLElement | null>(null)

// Initialize theme
useTheme()

useSectionReveal(mainRef)

// 彩蛋: Konami Code
const showKonamiMessage = ref(false)
useKonamiCode(() => {
  showKonamiMessage.value = true
  setTimeout(() => {
    showKonamiMessage.value = false
  }, 5000)
})
</script>

<template>
  <div
    class="page-shell"
    :class="{ 'is-loading': isLoading }"
  >
    <Transition name="loading-fade">
      <LoadingScreen v-if="isLoading" />
    </Transition>
    <SiteHeader />
    <main
      ref="mainRef"
      class="page-content"
    >
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <FandomSection />
      <ProjectsSection />
      <SocialSection />
      <ContactSection />
      <FriendsSection />
      <FooterSection />
    </main>
    <FloatingActions />
    
    <!-- 彩蛋: Konami Code 訊息 -->
    <Transition name="konami-fade">
      <div
        v-if="showKonamiMessage"
        class="konami-message"
      >
        <div class="konami-content">
          <p class="konami-title">成功解鎖隱藏成就！</p>
          <p class="konami-subtitle">你找到了 Konami Code 彩蛋</p>
          <p class="konami-hint">繼續探索，還有更多想不到的驚喜</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
/* 彩蛋: Konami Code 訊息樣式 */
.konami-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  pointer-events: none;
}

.konami-content {
  background: linear-gradient(
    135deg,
    rgba(186, 142, 166, 0.95),
    rgba(142, 166, 186, 0.95)
  );
  padding: 2rem 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: konami-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.konami-title {
  font-size: 1.75rem;
  font-weight: 900;
  color: white;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.konami-subtitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 1rem 0;
}

.konami-hint {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-style: italic;
}

@keyframes konami-appear {
  0% {
    transform: scale(0.5) rotate(-5deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.1) rotate(2deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.konami-fade-enter-active,
.konami-fade-leave-active {
  transition: opacity 0.5s ease;
}

.konami-fade-enter-from,
.konami-fade-leave-to {
  opacity: 0;
}
</style>
