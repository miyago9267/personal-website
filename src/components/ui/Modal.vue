<script setup lang="ts">
import { Teleport } from 'vue'

interface ModalProps {
  title: string
  isOpen: boolean
}

defineProps<ModalProps>()

const emit = defineEmits<{ (event: 'close'): void }>()

const close = () => emit('close')
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal" @click.self="close">
      <div class="modal__panel">
        <div class="modal__header">
          <h2 class="modal__title m-2">{{ title }}</h2>
          <button class="modal__close" type="button" @click="close">Close</button>
        </div>
        <div class="modal__body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal__header,
.modal__title,
.modal__close {
  color: var(--text);
}

.modal__close {
  border-color: var(--card-border);
}
</style>
