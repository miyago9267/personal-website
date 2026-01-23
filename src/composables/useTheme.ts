import { onMounted, ref } from 'vue'

type Theme = 'light' | 'dark'

export const useTheme = (defaultTheme: Theme = 'light') => {
  const isDark = ref(defaultTheme === 'dark')

  const setTheme = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    isDark.value = theme === 'dark'
  }

  const toggleTheme = () => {
    const next = isDark.value ? 'light' : 'dark'
    setTheme(next)
  }

  onMounted(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      setTheme(stored)
      return
    }
    setTheme(defaultTheme)
  })

  return {
    isDark,
    setTheme,
    toggleTheme,
  }
}
