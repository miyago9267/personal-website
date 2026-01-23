<script setup lang="ts">
interface TagProps {
  label: string
}

defineProps<TagProps>()
</script>

<template>
  <span class="tag-pill">
    {{ label }}
  </span>
</template>

<style scoped>
.tag-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  border: 1px solid var(--card-border);
  background: rgba(255, 255, 255, 0.6);
  color: var(--text);
}

[data-theme='dark'] .tag-pill {
  background: rgba(24, 24, 24, 0.6);
  color: #e5e7eb;
}
</style>
