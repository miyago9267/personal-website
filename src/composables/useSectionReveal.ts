import { onBeforeUnmount, onMounted, Ref } from 'vue'

export const useSectionReveal = (containerRef: Ref<HTMLElement | null>) => {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const container = containerRef.value
    if (!container || typeof IntersectionObserver === 'undefined') return

    const sections = Array.from(container.querySelectorAll('section'))
    if (!sections.length) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )

    sections.forEach((section) => observer?.observe(section))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
