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
  primary: 'bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 shadow-lg shadow-black/30',
  ghost: 'border border-gray-200/20 text-gray-100 hover:border-gray-200/50 hover:text-gray-50',
}
</script>

<template>
  <a :href="props.href" :class="[base, styles[props.variant]]" target="_blank" rel="noreferrer">
    {{ props.label }}
  </a>
</template>
