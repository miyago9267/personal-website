import baseProfile from '../data/profile.json'
import baseUi from '../locales/zh-TW/ui.json'
import { DEFAULT_LOCALE, detectLocale, mergeOverlay, type Locale } from './core'

export * from './core'

export type Profile = typeof baseProfile
export type Ui = typeof baseUi

// zh-TW 是 base，已經靜態打包；其他語言的 overlay 依需求載入
const overlayLoaders = import.meta.glob<{ default: unknown }>([
  '../locales/*/*.json',
  '!../locales/zh-TW/*.json',
])

const loadOverlay = async (locale: Locale, name: 'profile' | 'ui') => {
  const loader = overlayLoaders[`../locales/${locale}/${name}.json`]
  return loader ? (await loader()).default : undefined
}

let state: { locale: Locale; profile: Profile; ui: Ui } = {
  locale: DEFAULT_LOCALE,
  profile: baseProfile,
  ui: baseUi,
}

/** 在 mount 前呼叫一次；切換語言是換頁，不需要 reactive。 */
export async function setupI18n(locale: Locale = detectLocale(window.location.pathname)) {
  if (locale !== DEFAULT_LOCALE) {
    const [profile, ui] = await Promise.all([loadOverlay(locale, 'profile'), loadOverlay(locale, 'ui')])
    state = {
      locale,
      profile: mergeOverlay(baseProfile, profile),
      ui: mergeOverlay(baseUi, ui),
    }
  }
  document.documentElement.lang = locale
  return state.locale
}

export const useLocale = () => state.locale
export const useProfileData = () => state.profile
export const useUi = () => state.ui
export * from './preference'
