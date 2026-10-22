// 用本機 claude CLI（claude -p）補齊 en/ja/fr/es overlay 中尚未翻譯的 key；zh-CN 由 gen-zh-cn.ts 產生，不在此處理。
// 用法：bun scripts/translate-locales.ts [--dry-run] [--locale ja,fr]
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getAtPath, missingKeys, setAtPath, validateTranslation } from './locale-utils'

const root = join(import.meta.dir, '..', 'src')
const FILES: Record<string, string> = { profile: 'data/profile.json', ui: 'locales/zh-TW/ui.json' }
const LOCALES: Record<string, string> = { en: 'English', ja: 'Japanese', fr: 'French', es: 'Spanish' }

// 術語表：zh-TW 詞 -> 各語言譯法（未列出的語言沿用 default）；要新增術語加在這裡
const GLOSSARY: { zh: string; default: string; [locale: string]: string }[] = [
  { zh: '幻想鄉', default: 'Gensokyo', ja: '幻想郷' },
  { zh: 'MUGer', default: 'MUGer' },
  { zh: '東方 Project', default: 'Touhou Project', ja: '東方Project' },
  { zh: '音遊', default: 'rhythm game', ja: '音ゲー' },
  { zh: 'MyGO', default: 'MyGO' },
]

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const only = args.flatMap((a, i) => (a === '--locale' ? (args[i + 1] ?? '').split(',') : [])).filter(Boolean)
const unknown = only.filter((l) => !(l in LOCALES))
if (unknown.length) {
  console.error(`unknown locale: ${unknown.join(', ')} (available: ${Object.keys(LOCALES).join(', ')})`)
  process.exit(1)
}

const readJson = (f: string) => JSON.parse(readFileSync(f, 'utf8'))

function buildPrompt(locale: string, source: Record<string, unknown>) {
  const glossary = GLOSSARY.map((g) => `- ${g.zh} -> ${g[locale] ?? g.default}`).join('\n')
  return `Translate the following Traditional Chinese (zh-TW) personal-site copy into ${LOCALES[locale]}.
Be natural and concise. Keep proper nouns, game titles, handles, URLs and English tech terms unchanged.
Keep array lengths and order. Glossary:
${glossary}

Return ONLY a JSON object with exactly the same keys (no markdown, no commentary). String values stay strings; array values stay arrays of the same length.

${JSON.stringify(source, null, 2)}`
}

// 非互動呼叫 claude；停用所有 tool，prompt 走 stdin
async function callClaude(prompt: string): Promise<unknown> {
  const proc = Bun.spawn(['claude', '-p', '--output-format', 'json', '--tools', '', '--no-session-persistence'], {
    stdin: new Blob([prompt]),
    stdout: 'pipe',
    stderr: 'pipe',
  })
  const [out, err, code] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text(), proc.exited])
  if (code !== 0) throw new Error(`claude exited ${code}: ${(err || out).trim().slice(0, 300)}`)
  const envelope = JSON.parse(out)
  if (envelope.is_error || typeof envelope.result !== 'string') throw new Error(`claude error: ${String(envelope.result ?? out).slice(0, 300)}`)
  const text = envelope.result.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  return JSON.parse(text)
}

let failed = false
for (const locale of Object.keys(LOCALES)) {
  if (only.length && !only.includes(locale)) continue
  const overlays: Record<string, Record<string, unknown>> = {}
  const source: Record<string, unknown> = {}
  for (const name of Object.keys(FILES)) {
    const file = join(root, 'locales', locale, `${name}.json`)
    overlays[name] = existsSync(file) ? readJson(file) : {}
    const base = readJson(join(root, FILES[name]))
    const wrapped = { [name]: base }
    for (const p of missingKeys(base, overlays[name], name)) {
      source[p] = getAtPath(wrapped, p)
    }
  }
  const keys = Object.keys(source)
  if (!keys.length) {
    console.log(`${locale}: nothing to do`)
    continue
  }
  if (dryRun) {
    console.log(`${locale}: would translate ${keys.length} key(s)`)
    for (const k of keys) console.log(`  - ${k}: ${JSON.stringify(source[k])}`)
    continue
  }
  try {
    const result = validateTranslation(source, await callClaude(buildPrompt(locale, source)))
    for (const k of keys) {
      const name = k.split(/[.[]/)[0]
      setAtPath(overlays[name], k.slice(name.length).replace(/^\./, ''), result[k])
    }
    for (const name of Object.keys(FILES)) {
      if (keys.some((k) => k.split(/[.[]/)[0] === name)) {
        writeFileSync(join(root, 'locales', locale, `${name}.json`), JSON.stringify(overlays[name], null, 2) + '\n')
      }
    }
    console.log(`${locale}: ${keys.length} key(s) translated`)
  } catch (e) {
    failed = true
    console.error(`${locale}: failed, nothing written (${(e as Error).message})`)
  }
}
process.exit(failed ? 1 : 0)
