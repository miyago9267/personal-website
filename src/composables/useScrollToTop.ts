import { onMounted, onUnmounted, ref } from 'vue'

export const useScrollToTop = (threshold = 120) => {
  const showTop = ref(false)

  const handleScroll = () => {
    showTop.value = window.scrollY > threshold
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    showTop,
    scrollToTop,
  }
}
