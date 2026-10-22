import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3({
      // 主題以 <html data-theme> 切換，而非 .dark class
      dark: { dark: '[data-theme="dark"]', light: '[data-theme="light"]' },
    }),
  ],
  preflights: [],
  rules: [
    ['nerd', { 'font-family': '"FiraCode Nerd Font", monospace' }],
  ],
  variants: [
    // revealed:xxx -> section 進場取得 .is-visible 後才生效
    (matcher) => {
      if (!matcher.startsWith('revealed:')) return matcher
      return {
        matcher: matcher.slice('revealed:'.length),
        selector: (s) => `section.is-visible ${s}`,
      }
    },
  ],
})
