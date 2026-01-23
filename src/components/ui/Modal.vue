<script setup lang="ts">
interface ModalProps {
  title: string
  isOpen: boolean
}

defineProps<ModalProps>()

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-[999]"
      @click.self="close"
    >
      <div
        class="w-[min(720px,92vw)] bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-[16px] p-6 max-h-[85vh] overflow-auto"
      >
        <div class="flex items-center justify-between gap-3 text-[var(--text)]">
          <h3 class="text-[20px] text-[var(--text)]">
            {{ title }}
          </h3>
          <button
            class="bg-transparent border border-[var(--card-border)] text-[12px] text-[var(--muted)] rounded-full px-3 py-1 hover:text-[var(--text)]"
            type="button"
            @click="close"
          >
            Close
          </button>
        </div>
        <div class="mt-4">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
