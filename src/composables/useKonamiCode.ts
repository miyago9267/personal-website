import { ref, onMounted, onUnmounted } from 'vue'

// Konami Code 彩蛋: ↑ ↑ ↓ ↓ ← → ← → B A
export function useKonamiCode(callback: () => void) {
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA'
  ]
  
  const currentSequence = ref<string[]>([])
  
  const handleKeyPress = (event: KeyboardEvent) => {
    currentSequence.value.push(event.code)
    
    // 只保留最後 10 個按鍵
    if (currentSequence.value.length > 10) {
      currentSequence.value.shift()
    }
    
    // 檢查是否匹配 Konami Code
    if (currentSequence.value.join(',') === konamiCode.join(',')) {
      callback()
      currentSequence.value = []
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
  })
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
  
  return {
    currentSequence
  }
}
