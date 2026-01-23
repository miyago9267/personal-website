<script setup lang="ts">
interface TagProps {
  label: string
}

defineProps<TagProps>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-xs text-[var(--text)] bg-[var(--panel-bg)] shadow-[var(--card-shadow)]"
  >
    {{ label }}
  </span>
</template>
