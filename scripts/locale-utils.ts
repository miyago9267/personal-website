// check-locales 與 translate-locales 共用：找出尚未翻譯的路徑、寫入 overlay、驗證翻譯回應。
export const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

const hasCjk = (v: unknown) => typeof v === 'string' && /[぀-ヿ㐀-鿿]/.test(v)

// 專有名詞：各語系沿用 zh-TW 原文，不列為未翻譯。`[*]` 代表任意陣列 index
export const untranslatablePaths = ['profile.name', 'profile.nickname', 'profile.sideProjects[*].name']

const untranslatableRegexes = untranslatablePaths.map(
  (p) => new RegExp(`^${p.replace(/\./g, '\\.').replace(/\[\*\]/g, '\\[\\d+\\]')}$`),
)
const isUntranslatable = (path: string) => untranslatableRegexes.some((re) => re.test(path))

// 回傳 base 含中文、但 overlay 沒提供翻譯的路徑（純 URL、ID、英文名不需要翻）
export function missingKeys(base: unknown, overlay: unknown, path: string): string[] {
  if (isUntranslatable(path)) return []
  if (Array.isArray(base)) {
    if (base.length > 0 && base.every(isRecord)) {
      return base.flatMap((item, i) => missingKeys(item, Array.isArray(overlay) ? overlay[i] : undefined, `${path}[${i}]`))
    }
    return overlay === undefined && base.some(hasCjk) ? [path] : []
  }
  if (isRecord(base)) {
    return Object.keys(base).flatMap((k) => missingKeys(base[k], isRecord(overlay) ? overlay[k] : undefined, `${path}.${k}`))
  }
  return hasCjk(base) && overlay === undefined ? [path] : []
}

// 路徑 `a.b[2].c` -> ['a', 'b', 2, 'c']
const parsePath = (path: string) =>
  [...path.matchAll(/([^.[\]]+)|\[(\d+)\]/g)].map((m) => (m[2] !== undefined ? Number(m[2]) : m[1]))

export function getAtPath(root: unknown, path: string): unknown {
  return parsePath(path).reduce<unknown>((cur, seg) => (cur == null ? undefined : (cur as Record<string | number, unknown>)[seg]), root)
}

// 在 root 的路徑上寫值；中間物件自動建立，物件陣列的前面缺的 index 補 {}
export function setAtPath(root: Record<string, unknown>, path: string, value: unknown): void {
  const segs = parsePath(path)
  let cur: Record<string | number, unknown> = root
  segs.forEach((seg, i) => {
    if (i === segs.length - 1) {
      cur[seg] = value
      return
    }
    const next = segs[i + 1]
    let child = cur[seg]
    if (typeof next === 'number') {
      const arr = Array.isArray(child) ? child : (child = cur[seg] = [])
      for (let j = arr.length; j < next; j++) arr.push({})
      if (!isRecord(arr[next])) arr[next] = {}
      child = arr
    } else if (typeof child !== 'object' || child === null) {
      child = cur[seg] = {}
    }
    cur = child as Record<string | number, unknown>
  })
}

// 驗證翻譯回應：必須是恰好含 source 全部 key 的物件，字串對字串、陣列對等長字串陣列
export function validateTranslation(source: Record<string, unknown>, response: unknown): Record<string, unknown> {
  if (!isRecord(response)) throw new Error('response is not a JSON object')
  const want = Object.keys(source)
  const got = Object.keys(response)
  const missing = want.filter((k) => !(k in response))
  const extra = got.filter((k) => !(k in source))
  if (missing.length || extra.length) {
    throw new Error(`key mismatch (missing: ${missing.join(', ') || '-'}; extra: ${extra.join(', ') || '-'})`)
  }
  for (const k of want) {
    const src = source[k]
    const out = response[k]
    if (Array.isArray(src)) {
      if (!Array.isArray(out) || out.length !== src.length) throw new Error(`${k}: expected array of length ${src.length}`)
      if (!out.every((x) => typeof x === 'string')) throw new Error(`${k}: array items must be strings`)
    } else if (typeof out !== 'string') {
      throw new Error(`${k}: expected string`)
    }
  }
  return response
}
