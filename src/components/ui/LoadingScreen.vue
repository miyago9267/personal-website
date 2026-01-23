<template>
  <div class="fixed inset-0 grid place-items-center bg-[var(--bg)] z-100 animate-[fade-in_0.3s_var(--ease)]">
    <div class="grid gap-3 place-items-center">
      <div class="w-20 h-20 text-[var(--text)] animate-[loading-spin_3.2s_ease-in-out_infinite]">
        <svg
          viewBox="-2 -2 68 68"
          class="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M20 18l-6-6v16c-3 4-4 9-4 14 0 12 10 22 22 22s22-10 22-22c0-5-1-10-4-14V12l-6 6-8-6-4 4-4-4-8 6z"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linejoin="round"
          />
          <circle
            cx="24"
            cy="32"
            r="2"
            fill="currentColor"
          />
          <circle
            cx="40"
            cy="32"
            r="2"
            fill="currentColor"
          />
          <path
            d="M32 36c-3 4-7 4-10 2"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
          />
          <path
            d="M32 36c3 4 7 4 10 2"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <p class="text-[13px] text-[var(--muted)] text-center">
        少女祈禱中...
      </p>
    </div>
  </div>
</template>
