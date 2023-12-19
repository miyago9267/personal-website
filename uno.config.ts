// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    // Define a custom rule for your Nerd Font
    ['nerd', { 'font-family': '"FiraCode Nerd Font", monospace' }],
  ],
})