import { onBeforeUnmount, onMounted } from 'vue'

const MAX_TILT = 4

/**
 * 所有 .card-surface 共用的指標效果：單一 pointermove 監聽，
 * 在被指到的卡片上寫入 --mx/--my（聚光燈位置）與 --rx/--ry（傾斜角）。
 * 僅在精準指標裝置啟用；減少動態時只留聚光燈，不傾斜。
 */
export const useCardSpotlight = () => {
  let frame = 0
  let active: HTMLElement | null = null
  let pointer: { x: number; y: number; target: EventTarget | null } | null = null

  const clear = (card: HTMLElement | null) => {
    if (!card) return
    for (const name of ['--mx', '--my', '--rx', '--ry']) card.style.removeProperty(name)
  }

  const apply = () => {
    frame = 0
    if (!pointer) return
    const card = (pointer.target as Element | null)?.closest?.<HTMLElement>('.card-surface') ?? null
    if (card !== active) {
      clear(active)
      active = card
    }
    if (!card) return

    const rect = card.getBoundingClientRect()
    const px = (pointer.x - rect.left) / rect.width
    const py = (pointer.y - rect.top) / rect.height
    card.style.setProperty('--mx', `${pointer.x - rect.left}px`)
    card.style.setProperty('--my', `${pointer.y - rect.top}px`)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      card.style.setProperty('--ry', `${((px - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`)
      card.style.setProperty('--rx', `${(-(py - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`)
    }
  }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    pointer = { x: e.clientX, y: e.clientY, target: e.target }
    if (!frame) frame = requestAnimationFrame(apply)
  }

  const onLeave = () => {
    pointer = null
    clear(active)
    active = null
  }

  onMounted(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    document.removeEventListener('pointermove', onMove)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  })
}
