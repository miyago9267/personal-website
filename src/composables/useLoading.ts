import { onMounted, ref } from 'vue'

export const useLoading = (min = 2500, max = 4000) => {
  const isLoading = ref(true)

  onMounted(() => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min
    setTimeout(() => {
      isLoading.value = false
    }, delay)
  })

  return {
    isLoading,
  }
}
