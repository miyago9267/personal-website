import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  preflights: [],
  rules: [
    ['nerd', { 'font-family': '"FiraCode Nerd Font", monospace' }],
  ],
})
