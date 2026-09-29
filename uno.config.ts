import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  preflights: [],
  rules: [
    ['nerd', { 'font-family': '"FiraCode Nerd Font", monospace' }],
  ],
})
