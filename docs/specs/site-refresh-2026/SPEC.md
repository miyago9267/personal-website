---
title: 個人網站 2026 翻新
slug: site-refresh-2026
status: in-progress
created: 2026-09-29
updated: 2026-09-29
owner: Miyago
---

# 個人網站 2026 翻新

## 概要

網站自 2026-02 起沒有更新。翻新分成三個依序進行的階段，每個階段都能獨立上線：

- **A. 套件升級**：升級到目前的 major 版本，畫面和行為不變。
- **B. 內容更新**：更新坑單、梗與個人成績。
- **C. 多語系**：支援 `zh-TW`、`zh-CN`、`en`、`ja`、`es`、`fr`。

## 部署

- Host：ssh `miyago`（`miyago9267.com`）。nginx vhost 在 `/etc/nginx/domains/miyago9267.com/info.conf`。
- Root：`/srv/services/web/StaticSite/personal-website/dist`，`try_files $uri $uri/ /index.html`。
- 流程：本地 push 到 GitHub `miyago9267/personal-website`，接著在 host 上執行：

  ```bash
  cd /srv/services/web/StaticSite/personal-website && git pull && bun install && bun run build
  ```

  Host 上是 bun 1.3.11。
- Commit、push、部署都需要 Miyago 逐次同意。

---

## Phase A：套件升級

### 需求

- FR-A1：dependencies 升級到目前最新、而且彼此相容的版本。
- FR-A2：`build`、`typecheck`、`lint` 都通過，lint 不能新增 warning（升級前就有 16 個）。
- FR-A3：UnoCSS 產生的 class 集合和升級前一樣，preview 的 console 沒有 error。

### ADR-A1：TypeScript 停在 6.0

`typescript-eslint@8.71` 的 peer dependency 是 `typescript <6.1`，TS 7 等 `typescript-eslint` 支援後再升。**狀態**：accepted。

### ADR-A2：ESLint 改用 flat config

ESLint 10 已經移除 `.eslintrc`，改成 `eslint.config.js`，並用 `typescript-eslint` meta package 取代原本的 `@typescript-eslint/*` 兩個套件。**狀態**：accepted。

---

## Phase B：內容更新

### 需求

- FR-B1：音遊與其他遊戲成績更新到現況。
- FR-B2：坑單（`fandoms`）新增或移除作品，內容和現況一致。
- FR-B3：Side Projects、技能、經歷補上 2026 年的新項目。
- FR-B4：Footer 的動漫台詞彩蛋改成日文原文。沒有日文原作的作品保留原文。
- FR-B5：只寫有來源的事實。知識庫沒有紀錄的內容，要先問 Miyago，不能自行補完。

### 資料來源

`/Users/miyago/Project/Note/miyago-knowledge-base`（project wiki）、`推歌/`、Claude memories。候選清單和待問問題放在 `PROGRESS.md`。

### ADR-B1：台詞只存原文，不翻譯

台詞只保留一份日文原文，所有 locale 都顯示原文，可以另外加上出處。原文必須能找到出處，查不到的就刪掉，不自行創作「看起來像原文」的台詞。**狀態**：accepted。

---

## Phase C：多語系

### 需求

- FR-C1：支援 `zh-TW`（source）、`zh-CN`、`en`、`ja`、`es`、`fr`。
- FR-C2：各語言的網址為 `/`、`/zh-CN/`、`/en/`、`/ja/`、`/es/`、`/fr/`。每個語言有自己的 `index.html`，包含 `<html lang>`、翻譯後的 title/description/OG，以及 `hreflang`。
- FR-C3：locale 缺少的 key 要 fallback 到 `zh-TW`。
- FR-C4：Header 有語言切換器，選擇會記在 `localStorage`。根目錄不會依 `navigator.language` 自動轉址，只顯示切換提示。
- NFR-C1：不新增 runtime dependency，每個 locale 增加的 JS 不超過 20 KB（gzip 前）。

### ADR-C1：不引入 `vue-i18n`，自己寫 `useLocale`

網站只需要依語言整份替換內容，不需要複數規則或 ICU 格式，約 40 行就能完成。**狀態**：accepted。

### ADR-C2：zh-TW 為完整 base，其他語言為 overlay

`src/data/profile.json` 與 `src/locales/zh-TW/ui.json` 保持完整的 zh-TW 內容。`src/locales/<lang>/{profile,ui}.json` 只放需要翻譯的欄位，在 mount 前做 deep-merge（`src/i18n/core.ts` 的 `mergeOverlay`）：

- 物件陣列依 index 合併，URL、圖片等欄位由 base 補上。
- 字串陣列整份替換。
- 缺少 key 時 fallback 到 zh-TW。

非 zh-TW 的 overlay 以 lazy chunk 載入。原本規劃 base 只放不需翻譯的欄位，後來改成 zh-TW 直接當 base，這樣 fallback 最自然，也不用搬動既有資料。**狀態**：accepted（2026-09-29 修訂）。

慣例：坑單 `details` 中 `---` 之後的行是作品清單，以「、」分隔並顯示成 tag；`---` 之前都是一般說明，所以日文等語言可以正常使用「、」。這取代了原本「只要含有「、」就當作清單」的判斷，該判斷在 zh-TW 也會誤拆聲優、招式和成績等行。

### ADR-C3：`zh-CN` 由 OpenCC 產生

用 `opencc-js`（devDependency，tw→cn 並轉換慣用詞）從 `zh-TW` 產生檔案，產出的檔案要 commit，不在 runtime 轉換。**狀態**：accepted。

### ADR-C4：`base` 從 `'./'` 改成 `'/'`

改用子路徑後，相對路徑的 asset 在 `/en/` 底下會失效。網站部署在網域根目錄，改成 `'/'` 沒有副作用。**狀態**：accepted。

### ADR-C5：翻譯來源

`zh-TW` 是 source of truth。`en`、`ja` 由 Claude 翻譯，Miyago 審稿。`es`、`fr` 由 Claude 翻譯，footer 標示 machine-assisted。**狀態**：accepted。

---

## 測試方針

- 每個 phase 結束都跑 `bun run build && bun run typecheck && bun run lint`，並在 preview 檢查 console。
- Phase C 加上 `scripts/check-locales.ts`：驗證每個 locale 的 key 都是 `zh-TW` 的子集合，列出缺少的 key，並檢查每個語言的 `index.html` 有 6 條 `hreflang` 和 1 條 `x-default`。
- Phase C 的 EARS acceptance：
  - When 訪客開啟 `/ja/`，the site shall 用日文顯示所有非台詞文字，並設定 `<html lang="ja">`。
  - When 某個 locale 缺少某個 key，the site shall 顯示 `zh-TW` 的文字，不會顯示空白或 key 名稱。
  - When 訪客用切換器選擇語言，the site shall 導向對應的 path，並把選擇記在 `localStorage`。
