<script setup lang="ts">
interface ButtonLinkProps {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
}

const props = withDefaults(defineProps<ButtonLinkProps>(), {
  variant: 'primary',
})

const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base transition duration-300'
const styles: Record<NonNullable<ButtonLinkProps['variant']>, string> = {
  primary: 'bg-[var(--text)] text-[var(--bg)] font-semibold hover:bg-[var(--text)]/85 shadow-[var(--card-shadow)]',
  ghost: 'border border-[var(--card-border)] text-[var(--text)]/80 hover:text-[var(--text)]',
}
</script>

<template>
  <a
    :href="props.href"
    :class="[base, styles[props.variant]]"
    target="_blank"
    rel="noreferrer"
  >
    {{ props.label }}
  </a>
</template>
