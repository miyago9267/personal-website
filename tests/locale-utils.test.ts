import { describe, expect, test } from 'bun:test'
import { getAtPath, missingKeys, setAtPath, validateTranslation } from '../scripts/locale-utils'

describe('missingKeys', () => {
  test('字串：含中文且 overlay 沒值才算', () => {
    const base = { a: '中文', b: 'English', c: '有' }
    expect(missingKeys(base, { c: 'x' }, 'p')).toEqual(['p.a'])
  })

  test('字串陣列整條算一個路徑', () => {
    expect(missingKeys({ tags: ['英文', 'x'] }, {}, 'p')).toEqual(['p.tags'])
    expect(missingKeys({ tags: ['英文'] }, { tags: ['en'] }, 'p')).toEqual([])
  })

  test('物件陣列依 index 比對', () => {
    const base = { list: [{ n: '甲' }, { n: '乙' }] }
    expect(missingKeys(base, { list: [{ n: 'A' }] }, 'p')).toEqual(['p.list[1].n'])
  })

  test('專有名詞路徑不算未翻譯', () => {
    const base = { name: '水源宮語', sideProjects: [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: '魔法部屋' }] }
    expect(missingKeys(base, {}, 'profile')).toEqual([])
  })
})

describe('setAtPath', () => {
  test('建立中間物件並保留既有內容', () => {
    const o: Record<string, unknown> = { a: { x: 1 } }
    setAtPath(o, 'a.y.z', 'v')
    expect(o).toEqual({ a: { x: 1, y: { z: 'v' } } })
  })

  test('物件陣列補 {} 對齊 index', () => {
    const o: Record<string, unknown> = {}
    setAtPath(o, 'list[2].name', 'N')
    expect(o).toEqual({ list: [{}, {}, { name: 'N' }] })
    expect(getAtPath(o, 'list[2].name')).toBe('N')
  })

  test('寫入字串陣列整條取代', () => {
    const o: Record<string, unknown> = {}
    setAtPath(o, 'tags', ['a', 'b'])
    expect(o).toEqual({ tags: ['a', 'b'] })
  })
})

describe('validateTranslation', () => {
  const source = { s: '中', arr: ['一', '二'] }

  test('合法回應通過', () => {
    const res = { s: 'a', arr: ['1', '2'] }
    expect(validateTranslation(source, res)).toEqual(res)
  })

  test('缺 key 或多 key 失敗', () => {
    expect(() => validateTranslation(source, { s: 'a' })).toThrow('missing: arr')
    expect(() => validateTranslation(source, { s: 'a', arr: ['1', '2'], z: 'x' })).toThrow('extra: z')
  })

  test('陣列長度或型別錯誤失敗', () => {
    expect(() => validateTranslation(source, { s: 'a', arr: ['1'] })).toThrow('length 2')
    expect(() => validateTranslation(source, { s: ['a'], arr: ['1', '2'] })).toThrow('expected string')
  })
})
