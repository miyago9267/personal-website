import { onBeforeUnmount, onMounted, ref } from 'vue'

/** 載入狀態為模組層級共用：App 負責計時，其他元件（如 Hero）直接讀取。 */
export const isLoading = ref(true)

const LOCK_CLASS = 'scroll-locked'

const lockScroll = () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.documentElement.classList.add(LOCK_CLASS)
}

const unlockScroll = () => {
  document.documentElement.classList.remove(LOCK_CLASS)
  // 深連結（#about）在載入期間被強制回頂，結束後補捲過去
  const target = window.location.hash ? document.querySelector(window.location.hash) : null
  target?.scrollIntoView()
}

/** 啟動載入畫面計時；載入期間鎖住頁面捲動。 */
export const useLoading = (min = 2500, max = 4000) => {
  let timer: ReturnType<typeof setTimeout> | undefined

  lockScroll()

  onMounted(() => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min
    timer = setTimeout(() => {
      isLoading.value = false
      unlockScroll()
    }, delay)
  })

  onBeforeUnmount(() => {
    clearTimeout(timer)
    unlockScroll()
  })

  return {
    isLoading,
  }
}
