<script setup lang="ts">
import { computed, ref } from 'vue'
import profile from '../data/profile.json'
import SectionTitle from '../components/ui/SectionTitle.vue'
import Modal from '../components/ui/Modal.vue'

type FandomItem = {
  name: string
  summary: string
  details: string[]
  images?: string[]
}

const activeItem = ref<FandomItem | null>(null)
const activeImageIndex = ref(0)

const hasImages = computed(() => (activeItem.value?.images?.length ?? 0) > 0)

const openItem = (item: FandomItem) => {
  activeItem.value = item
  activeImageIndex.value = 0
}

const closeItem = () => {
  activeItem.value = null
}

const prevImage = () => {
  if (!activeItem.value?.images?.length) return
  activeImageIndex.value = Math.max(0, activeImageIndex.value - 1)
}

const nextImage = () => {
  if (!activeItem.value?.images?.length) return
  activeImageIndex.value = Math.min(activeItem.value.images.length - 1, activeImageIndex.value + 1)
}
</script>

<template>
  <section id="fandoms" class="py-4 md:py-8">
    <SectionTitle
      kicker="Fandom"
      title="網路與 ACG 坑單"
      subtitle="我混過的世界與留下的足跡，都記在這裡。"
    />
    <div class="my-8 grid gap-6 md:grid-cols-3">
      <div
        v-for="group in profile.fandoms"
        :key="group.title"
        class="card rounded-[20px] p-6"
      >
        <h2 class="text-lg font-semibold text-gray-100">{{ group.title }}</h2>
        <div class="mt-4 grid gap-3 text-gray-100/80">
          <div v-for="item in group.items" :key="item.name" class="flex items-center justify-between gap-3">
            <span>{{ item.name }}</span>
            <button class="fandom__open" type="button" @click="openItem(item)">查看</button>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="activeItem" :is-open="!!activeItem" :title="activeItem.name" @close="closeItem">
      <p class="text-sm text-gray-200/80">{{ activeItem.summary }}</p>
      <ul class="mt-4 grid gap-2 text-sm text-gray-200/80">
        <li v-for="detail in activeItem.details" :key="detail">{{ detail }}</li>
      </ul>
      <div v-if="hasImages" class="modal__carousel">
        <button
          class="modal__nav modal__nav--prev"
          type="button"
          :disabled="activeImageIndex === 0"
          @click="prevImage"
        >
          ←
        </button>
        <div class="modal__viewport">
          <div
            class="modal__track"
            :style="{ transform: `translateX(-${activeImageIndex * 100}%)` }"
          >
            <div v-for="img in activeItem.images" :key="img" class="modal__slide">
              <img :src="img" :alt="activeItem.name" />
            </div>
          </div>
        </div>
        <button
          class="modal__nav modal__nav--next"
          type="button"
          :disabled="activeItem.images ? activeImageIndex === activeItem.images.length - 1 : true"
          @click="nextImage"
        >
          →
        </button>
      </div>
      <p v-if="hasImages" class="modal__counter">
        {{ activeImageIndex + 1 }} / {{ activeItem.images?.length }}
      </p>
    </Modal>
  </section>
</template>
