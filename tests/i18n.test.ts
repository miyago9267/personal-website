import { describe, expect, test } from 'bun:test'
import { detectLocale, localePath, mergeOverlay, suggestLocale } from '../src/i18n/core'

describe('mergeOverlay', () => {
  test('overlay 字串覆蓋 base', () => {
    expect(mergeOverlay({ a: '中', b: '文' }, { a: 'EN' })).toEqual({ a: 'EN', b: '文' })
  })

  test('缺少的 key fallback 到 base', () => {
    expect(mergeOverlay({ a: { b: '中', c: '文' } }, { a: { c: 'EN' } })).toEqual({ a: { b: '中', c: 'EN' } })
  })

  test('base 沒有的 key 會被忽略', () => {
    expect(mergeOverlay({ a: '中' }, { a: 'EN', typo: 'x' })).toEqual({ a: 'EN' })
  })

  test('物件陣列依 index 合併，保留 base 的 URL 等欄位', () => {
    const base = { list: [{ name: '甲', href: 'https://a' }, { name: '乙', href: 'https://b' }] }
    const overlay = { list: [{ name: 'A' }] }
    expect(mergeOverlay(base, overlay)).toEqual({
      list: [{ name: 'A', href: 'https://a' }, { name: '乙', href: 'https://b' }],
    })
  })

  test('字串陣列整份替換，不混入 base 的剩餘項目', () => {
    expect(mergeOverlay({ lines: ['一', '二', '三'] }, { lines: ['one'] })).toEqual({ lines: ['one'] })
  })

  test('型別不符時保留 base', () => {
    expect(mergeOverlay({ a: '中', b: ['x'] }, { a: 1, b: 'y' })).toEqual({ a: '中', b: ['x'] })
  })

  test('overlay 為 undefined 時回傳 base', () => {
    const base = { a: '中' }
    expect(mergeOverlay(base, undefined)).toEqual(base)
  })
})

describe('detectLocale', () => {
  test('根目錄是 zh-TW', () => {
    expect(detectLocale('/')).toBe('zh-TW')
  })

  test('從第一段 path 判斷語言', () => {
    expect(detectLocale('/en/')).toBe('en')
    expect(detectLocale('/ja')).toBe('ja')
    expect(detectLocale('/zh-CN/')).toBe('zh-CN')
  })

  test('大小寫不敏感', () => {
    expect(detectLocale('/zh-cn/')).toBe('zh-CN')
  })

  test('未知 path 回到 zh-TW', () => {
    expect(detectLocale('/blog/')).toBe('zh-TW')
    expect(detectLocale('/zh-TW/')).toBe('zh-TW')
  })
})

describe('localePath', () => {
  test('zh-TW 在根目錄，其他語言有 prefix', () => {
    expect(localePath('zh-TW')).toBe('/')
    expect(localePath('en')).toBe('/en/')
    expect(localePath('zh-CN')).toBe('/zh-CN/')
  })
})

describe('suggestLocale', () => {
  test('依瀏覽器語言建議非預設語言', () => {
    expect(suggestLocale(['en-US', 'en'], null)).toBe('en')
    expect(suggestLocale(['ja-JP'], null)).toBe('ja')
    expect(suggestLocale(['fr-CA'], null)).toBe('fr')
    expect(suggestLocale(['es-419'], null)).toBe('es')
  })

  test('簡體中文地區對應 zh-CN', () => {
    expect(suggestLocale(['zh-CN'], null)).toBe('zh-CN')
    expect(suggestLocale(['zh-Hans-SG'], null)).toBe('zh-CN')
    expect(suggestLocale(['zh'], null)).toBe('zh-CN')
  })

  test('繁體中文或已是預設語言時不提示', () => {
    expect(suggestLocale(['zh-TW'], null)).toBeNull()
    expect(suggestLocale(['zh-Hant-HK'], null)).toBeNull()
    expect(suggestLocale(['zh-HK'], null)).toBeNull()
  })

  test('使用者選過語言就不再提示', () => {
    expect(suggestLocale(['en-US'], 'zh-TW')).toBeNull()
  })

  test('第一個認得的語言優先，不支援的略過', () => {
    expect(suggestLocale(['ko-KR', 'ja-JP', 'en'], null)).toBe('ja')
    expect(suggestLocale(['ko-KR'], null)).toBeNull()
  })
})
