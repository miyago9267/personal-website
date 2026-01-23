<script setup lang="ts">
import { useProfile } from '../composables/useProfile'

import SectionTitle from '../components/ui/SectionTitle.vue'
import Modal from '../components/ui/Modal.vue'
import { useGalleryModal } from '../composables/useGalleryModal'

const profile = useProfile()
type FandomItem = {
  name: string
  summary: string
  details: string[]
  images?: string[]
}

const { activeItem, activeIndex, hasImages, open, close, prev, next } = useGalleryModal<FandomItem>()
</script>

<template>
  <section
    id="fandoms"
    class="py-4 md:py-8"
  >
    <SectionTitle
      kicker="Fandom"
      title="網路與 ACG 坑單"
      subtitle="我混過的世界與留下的足跡，都記在這裡。"
    />
    <div class="my-8 grid gap-6 md:grid-cols-3">
      <div
        v-for="group in profile.fandoms"
        :key="group.title"
        class="card-surface rounded-[20px] p-6 bg-[var(--card-bg)] shadow-[var(--card-shadow)]"
      >
        <h2 class="text-lg font-semibold text-[var(--text)]">
          {{ group.title }}
        </h2>
        <div class="mt-4 grid gap-3 text-[var(--text)]/80">
          <div
            v-for="item in group.items"
            :key="item.name"
            class="flex items-center justify-between gap-3"
          >
            <span>{{ item.name }}</span>
            <button
              class="rounded-full px-3 py-1 text-[12px] text-[var(--muted)] bg-[var(--panel-bg)] shadow-[var(--card-shadow)] transition hover:text-[var(--text)]"
              type="button"
              @click="open(item)"
            >
              查看
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-if="activeItem"
      :is-open="!!activeItem"
      :title="activeItem.name"
      @close="close"
    >
      <p class="text-sm text-[var(--muted)]">
        {{ activeItem.summary }}
      </p>
      <ul class="mt-4 grid gap-2 text-sm text-[var(--muted)]">
        <li
          v-for="detail in activeItem.details"
          :key="detail"
        >
          {{ detail }}
        </li>
      </ul>
      <div
        v-if="hasImages"
        class="mt-4 grid grid-cols-[auto_1fr_auto] gap-3 items-center lt-sm:grid-cols-1"
      >
        <button
          class="w-9 h-9 rounded-full bg-[var(--card-bg)] text-[var(--muted)] shadow-[var(--card-shadow)] transition hover:text-[var(--text)] disabled:opacity-40 disabled:cursor-not-allowed lt-sm:w-full lt-sm:h-8"
          type="button"
          :disabled="activeIndex === 0"
          @click="prev"
        >
          ←
        </button>
        <div class="overflow-hidden rounded-[12px] bg-black/10">
          <div
            class="flex transition-transform duration-[350ms] ease-[var(--ease)]"
            :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
          >
            <div
              v-for="img in activeItem.images"
              :key="img"
              class="min-w-full"
            >
              <img
                :src="img"
                :alt="activeItem.name"
                class="w-full h-[360px] lt-sm:h-[240px] object-contain block bg-black/20"
              >
            </div>
          </div>
        </div>
        <button
          class="w-9 h-9 rounded-full bg-[var(--card-bg)] text-[var(--muted)] shadow-[var(--card-shadow)] transition hover:text-[var(--text)] disabled:opacity-40 disabled:cursor-not-allowed lt-sm:w-full lt-sm:h-8"
          type="button"
          :disabled="activeItem.images ? activeIndex === activeItem.images.length - 1 : true"
          @click="next"
        >
          →
        </button>
      </div>
      <p
        v-if="hasImages"
        class="mt-2 text-[12px] text-[var(--muted)] text-right"
      >
        {{ activeIndex + 1 }} / {{ activeItem.images?.length }}
      </p>
    </Modal>
  </section>
</template>
