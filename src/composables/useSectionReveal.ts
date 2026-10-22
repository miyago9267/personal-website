import { onBeforeUnmount, onMounted, Ref } from 'vue'

const BATCH_CAP = 8

/**
 * 區塊進場：section 取得 is-visible（供 revealed: 變體使用），
 * 標題各部分與 .card-surface 則各自進入視窗時依批次內順序錯開上浮。
 */
export const useSectionReveal = (containerRef: Ref<HTMLElement | null>) => {
  let sectionObserver: IntersectionObserver | null = null
  let itemObserver: IntersectionObserver | null = null

  onMounted(() => {
    const container = containerRef.value
    if (!container || typeof IntersectionObserver === 'undefined') return

    const sections = Array.from(container.querySelectorAll<HTMLElement>('section'))
    const aboveViewport = (entry: IntersectionObserverEntry) =>
      !entry.isIntersecting && entry.boundingClientRect.top < 0

    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || aboveViewport(entry)) {
            entry.target.classList.add('is-visible')
            sectionObserver?.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px' }
    )

    itemObserver = new IntersectionObserver(
      (entries) => {
        // 同一批進場的元素依 DOM 順序錯開；已捲過（位於視窗上方）的直接就位不播動畫
        const batch = entries
          .filter((e) => e.isIntersecting || aboveViewport(e))
          .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        let order = 0
        batch.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.style.setProperty('--stagger', String(Math.min(order++, BATCH_CAP)))
            el.classList.add('is-in')
          } else {
            el.classList.add('is-in', 'is-settled')
          }
          itemObserver?.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px' }
    )

    sections.forEach((section) => {
      sectionObserver?.observe(section)
      if (section.classList.contains('hero-section')) return
      section.querySelectorAll<HTMLElement>('.card-surface').forEach((card) => card.classList.add('reveal-item'))
      section.querySelectorAll<HTMLElement>('.reveal-item').forEach((item) => itemObserver?.observe(item))
    })
  })

  onBeforeUnmount(() => {
    sectionObserver?.disconnect()
    itemObserver?.disconnect()
  })
}
