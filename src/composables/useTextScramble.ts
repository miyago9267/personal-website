import { onBeforeUnmount, ref } from 'vue'

const GLYPHS = '!<>-_\\/[]{}=+*^?#%&01'
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

/**
 * 文字亂碼解析效果：未解析的字元以隨機 ASCII 符號顯示，由左到右逐字定格成目標文字。
 * 結束時 text 一定等於目標字串（含 CJK）。
 */
export const useTextScramble = (initial: string) => {
  const text = ref(initial)
  let frame = 0

  const set = (next: string) => {
    cancelAnimationFrame(frame)
    text.value = next
  }

  const scrambleTo = (next: string, duration = 600) => {
    cancelAnimationFrame(frame)
    const chars = Array.from(next)
    const start = performance.now()
    let lastShuffle = 0
    let noise = chars.map(randomGlyph)

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      if (progress >= 1) {
        text.value = next
        return
      }
      // 符號約每 45ms 換一次，避免閃爍過快
      if (now - lastShuffle > 45) {
        noise = chars.map(randomGlyph)
        lastShuffle = now
      }
      const resolved = Math.floor(progress * chars.length)
      text.value = chars.map((c, i) => (i < resolved || c === ' ' ? c : noise[i])).join('')
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return { text, scrambleTo, set }
}
