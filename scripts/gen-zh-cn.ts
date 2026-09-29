// 由 zh-TW base 產生 zh-CN overlay（OpenCC 台灣正體 -> 大陸簡體，含慣用詞轉換）。
// zh-TW 內容更新後重跑：bun scripts/gen-zh-cn.ts
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import * as OpenCC from 'opencc-js'

const root = join(import.meta.dir, '..', 'src')
const convert = OpenCC.Converter({ from: 'twp', to: 'cn' })
const hasCjk = (s: string) => /[㐀-鿿]/.test(s)

// twp 詞彙轉換的誤判：同人／遊戲圈慣用語與專有名詞改回來（依序套用）
const FIXES: [string, string][] = [
  ['设置厨', '设定厨'],
  ['电辅音乐', '电子音乐'],
  ['模块', '模组'],
  ['拷贝人', '复制人'],
  ['公主链接', '公主连结'],
  ['信息社', '资讯社'],
  ['社区', '社群'],
  ['社群链接', '社交链接'],
]
const toCn = (s: string) => FIXES.reduce((out, [from, to]) => out.replaceAll(from, to), convert(s))

// 保留完整結構（物件陣列要對齊 index），只轉換含漢字的字串
function toSimplified(value: unknown): unknown {
  if (typeof value === 'string') return hasCjk(value) ? toCn(value) : value
  if (Array.isArray(value)) return value.map(toSimplified)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toSimplified(v)]))
  }
  return value
}

const sources = {
  profile: join(root, 'data/profile.json'),
  ui: join(root, 'locales/zh-TW/ui.json'),
}

mkdirSync(join(root, 'locales/zh-CN'), { recursive: true })
for (const [name, file] of Object.entries(sources)) {
  const out = toSimplified(JSON.parse(readFileSync(file, 'utf8')))
  writeFileSync(join(root, `locales/zh-CN/${name}.json`), `${JSON.stringify(out, null, 2)}\n`)
  console.log(`wrote locales/zh-CN/${name}.json`)
}
