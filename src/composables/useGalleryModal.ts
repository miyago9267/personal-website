import { computed, ref } from 'vue'

type WithImages = {
  images?: string[]
}

export const useGalleryModal = <T extends WithImages>() => {
  const activeItem = ref<T | null>(null)
  const activeIndex = ref(0)

  const hasImages = computed(() => (activeItem.value?.images?.length ?? 0) > 0)

  const open = (item: T) => {
    activeItem.value = item
    activeIndex.value = 0
  }

  const close = () => {
    activeItem.value = null
  }

  const prev = () => {
    if (!activeItem.value?.images?.length) return
    activeIndex.value = Math.max(0, activeIndex.value - 1)
  }

  const next = () => {
    if (!activeItem.value?.images?.length) return
    activeIndex.value = Math.min(activeItem.value.images.length - 1, activeIndex.value + 1)
  }

  return {
    activeItem,
    activeIndex,
    hasImages,
    open,
    close,
    prev,
    next,
  }
}
