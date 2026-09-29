// 檢查每個 locale overlay 的 key 都存在於 zh-TW base，並列出尚未翻譯的 key。
// 用法：bun scripts/check-locales.ts；有多餘（拼錯）的 key 時 exit 1。
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dir, '..', 'src')
const bases: Record<string, unknown> = {
  profile: JSON.parse(readFileSync(join(root, 'data/profile.json'), 'utf8')),
  ui: JSON.parse(readFileSync(join(root, 'locales/zh-TW/ui.json'), 'utf8')),
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

// 回傳 overlay 中 base 沒有的路徑
function extraKeys(base: unknown, overlay: unknown, path: string): string[] {
  if (Array.isArray(overlay)) {
    if (!Array.isArray(base)) return [path]
    if (!base.every(isRecord)) return []
    return overlay.flatMap((item, i) => (i >= base.length ? [`${path}[${i}]`] : extraKeys(base[i], item, `${path}[${i}]`)))
  }
  if (isRecord(overlay)) {
    if (!isRecord(base)) return [path]
    return Object.keys(overlay).flatMap((k) => (k in base ? extraKeys(base[k], overlay[k], `${path}.${k}`) : [`${path}.${k}`]))
  }
  return []
}

const hasCjk = (v: unknown) => typeof v === 'string' && /[\u3040-\u30ff\u3400-\u9fff]/.test(v)

// 回傳 base 含中文、但 overlay 沒提供翻譯的路徑（純 URL、ID、英文名不需要翻）
function missingKeys(base: unknown, overlay: unknown, path: string): string[] {
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

let failed = false
const localesDir = join(root, 'locales')
for (const locale of readdirSync(localesDir).filter((d) => d !== 'zh-TW').sort()) {
  for (const name of Object.keys(bases)) {
    const file = join(localesDir, locale, `${name}.json`)
    if (!existsSync(file)) {
      console.log(`${locale}/${name}.json: missing file (falls back to zh-TW)`)
      continue
    }
    const overlay = JSON.parse(readFileSync(file, 'utf8'))
    const extra = extraKeys(bases[name], overlay, name)
    const missing = missingKeys(bases[name], overlay, name)
    if (extra.length) {
      failed = true
      console.log(`${locale}/${name}.json: ${extra.length} unknown key(s)`)
      extra.forEach((k) => console.log(`  x ${k}`))
    }
    console.log(`${locale}/${name}.json: ${missing.length} untranslated (fall back to zh-TW)`)
    if (process.argv.includes('--verbose')) missing.forEach((k) => console.log(`  - ${k}`))
  }
}
process.exit(failed ? 1 : 0)
