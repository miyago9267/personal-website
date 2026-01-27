<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dots = ref('...')
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    if (dots.value.length >= 3) {
      dots.value = ''
    } else {
      dots.value += '.'
    }
  }, 500)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="fixed inset-0 grid place-items-center bg-[var(--bg)] z-100 animate-[fade-in_0.3s_var(--ease)]">
    <div class="grid gap-3 place-items-center">
      <div class="w-40 h-40 animate-[loading-spin_3.2s_ease-in-out_infinite]">
        <img 
          src="/miyago_face.png" 
          class="w-full h-full object-contain" 
          alt="Loading..."
        />
      </div>
      <p class="text-[13px] text-[var(--muted)] flex justify-center items-center">
        <span>少女祈禱中</span>
        <span class="w-6 text-left">{{ dots }}</span>
      </p>
    </div>
  </div>
</template>
