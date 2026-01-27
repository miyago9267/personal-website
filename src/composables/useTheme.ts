import { ref } from 'vue'

type Theme = 'light' | 'dark'

export const useTheme = (defaultTheme: Theme = 'light') => {
  const getStoredTheme = (): Theme | null => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') as Theme | null
    }
    return null
  }

  const stored = getStoredTheme()
  const currentTheme = stored ?? defaultTheme
  const isDark = ref(currentTheme === 'dark')

  const setTheme = (theme: Theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
    isDark.value = theme === 'dark'
  }

  const toggleTheme = () => {
    const next = isDark.value ? 'light' : 'dark'
    setTheme(next)
  }

  // Apply immediately
  setTheme(currentTheme)

  return {
    isDark,
    setTheme,
    toggleTheme,
  }
}
