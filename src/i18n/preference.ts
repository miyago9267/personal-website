import { localePath, type Locale } from './core'

const STORAGE_KEY = 'locale'

export function readStoredLocale(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function storeLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // 無痕模式或封鎖 storage 時只是不記住選擇
  }
}

export function switchLocale(locale: Locale) {
  storeLocale(locale)
  window.location.href = localePath(locale) + window.location.hash
}

/** 建議 banner 用目標語言顯示，所以文字不走 ui.json。 */
export const SUGGEST_TEXT: Record<Locale, { message: string; accept: string; dismiss: string }> = {
  'zh-TW': { message: '這個網站有繁體中文版。', accept: '切換', dismiss: '不用了' },
  'zh-CN': { message: '本站提供简体中文版。', accept: '切换', dismiss: '不用了' },
  en: { message: 'This site is available in English.', accept: 'Switch', dismiss: 'No thanks' },
  ja: { message: 'このサイトは日本語でもご覧いただけます。', accept: '切り替える', dismiss: '閉じる' },
  es: { message: 'Este sitio está disponible en español.', accept: 'Cambiar', dismiss: 'No, gracias' },
  fr: { message: 'Ce site est disponible en français.', accept: 'Changer', dismiss: 'Non merci' },
}
