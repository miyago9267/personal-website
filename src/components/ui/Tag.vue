<script setup lang="ts">
interface TagProps {
  label: string
}

defineProps<TagProps>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-xs border border-[var(--card-border)] text-[var(--text)] bg-[var(--card-bg)]"
  >
    {{ label }}
  </span>
</template>
