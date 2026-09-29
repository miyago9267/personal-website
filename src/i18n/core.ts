export const LOCALES = ['zh-TW', 'zh-CN', 'en', 'ja', 'es', 'fr'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'zh-TW'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * 把翻譯 overlay 疊在 zh-TW base 上。
 * 只保留 base 有的 key；物件陣列依 index 合併（保留 URL 等未翻譯欄位），
 * 字串陣列整份替換；型別不符或缺值時 fallback 到 base。
 */
export function mergeOverlay<T>(base: T, overlay: unknown): T {
  if (overlay === undefined || overlay === null) return base

  if (Array.isArray(base)) {
    if (!Array.isArray(overlay)) return base
    if (base.length > 0 && base.every(isRecord)) {
      return base.map((item, i) => mergeOverlay(item, overlay[i])) as T
    }
    return overlay as T
  }

  if (isRecord(base)) {
    if (!isRecord(overlay)) return base
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(base)) {
      out[key] = mergeOverlay(base[key], overlay[key])
    }
    return out as T
  }

  return (typeof overlay === typeof base ? overlay : base) as T
}

/** zh-TW 放在根目錄，其他語言用第一段 path 當 prefix。 */
export function detectLocale(pathname: string): Locale {
  const segment = pathname.split('/')[1]?.toLowerCase() ?? ''
  const match = LOCALES.find((locale) => locale.toLowerCase() === segment)
  return match && match !== DEFAULT_LOCALE ? match : DEFAULT_LOCALE
}

export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
}

export function format(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`))
}

/** 切換器顯示的語言名稱，一律用該語言自己的寫法。 */
export const LOCALE_NAMES: Record<Locale, string> = {
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  en: 'English',
  ja: '日本語',
  es: 'Español',
  fr: 'Français',
}

const toLocale = (tag: string): Locale | null => {
  const [lang, ...rest] = tag.toLowerCase().split('-')
  if (lang === 'zh') {
    const traditional = rest.some((part) => ['hant', 'tw', 'hk', 'mo'].includes(part))
    return traditional ? 'zh-TW' : 'zh-CN'
  }
  return LOCALES.find((locale) => locale === lang) ?? null
}

/**
 * 首次造訪根目錄時，依瀏覽器語言建議要不要切換。
 * 使用者選過語言（stored 有值）或建議結果就是預設語言時回傳 null。
 */
export function suggestLocale(languages: readonly string[], stored: string | null): Locale | null {
  if (stored) return null
  for (const tag of languages) {
    const locale = toLocale(tag)
    if (locale) return locale === DEFAULT_LOCALE ? null : locale
  }
  return null
}
