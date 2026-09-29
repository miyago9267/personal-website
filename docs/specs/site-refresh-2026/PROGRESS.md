# PROGRESS：site-refresh-2026

## Phase A：套件升級（完成）

- [x] 套件升級：vue 3.5.43、unocss 66.10.5、vite 8.3.1、@vitejs/plugin-vue 6.0.9、vue-tsc 3.3.11、typescript 6.0.3、eslint 10.11.0、eslint-plugin-vue 10.11.1、vue-eslint-parser 10.4.1、typescript-eslint 8.71.0
- [x] 改用 `eslint.config.js` flat config，UnoCSS 改用 `presetWind3`
- [x] 驗證：build、typecheck、lint 都通過；lint 仍是原本的 16 個 warning，0 error；新舊版 CSS selector 集合一樣；preview 的 console 0 error
- [x] Commit `97bcdac`，push 到 GitHub
- [x] 2026-09-29 部署到 `miyago`：線上 `info.miyago9267.com` 回 200，載入的 asset hash 與 host build 結果相同

## Phase B：內容更新（完成）

- [x] Footer 台詞改成日文原文並附出處，commit `5fa4fba`，已部署
- [x] 音遊成績：Arcaea Ptt 12.538，maimai Rating 15200，BanG Dream 註明只玩老邦；Sekai 沒有變動
- [x] 東方：新增「東方 Project」通關紀錄（錦上京／紺珠傳／紅魔鄉／星蓮船／天空璋），坑單說明更新成最深的坑
- [x] 神魔之塔 summary：「一直罵但還是一直玩」
- [x] Side Projects 新增東方靈萃壇（https://touhou.reisuidan.com）
- [x] 梗：Footer 台詞加入 5 句東方原文；Skills 連點到剛好 67 下時顯示「6... 7!」
- [x] 驗證：build、typecheck、lint 都通過；preview 上能看到新內容，東方 modal 顯示正確，console 0 error
- [x] 決定：JLPT 不放（Miyago 不想放）
- [x] 決定：其他候選項目（coralline、Cosmos Music Player、Fate mod、JapaneseSpeedRun、Prisma/Kotlin）不放，因為不是還沒完成就是 fork
- [x] Commit 並部署（2026-09-29）
- [x] 友站新增 CabLate（https://cablate.com/）與 Nyanako（GitHub `Nanako0129`，目前沒有個人站）
- [x] 修正：盤古之白擴充插入的 `<pangu>` 會打亂 grid 卡片，已用 `pangu { display: contents; }` 處理

### 備註

- 作品清單改用 `---` 標記（見 SPEC ADR-C2 慣例）。

## Phase C：多語系（進行中）

- [x] C1：`src/i18n/`（core + loader）、`src/locales/zh-TW/ui.json`，把 15 個元件中寫死的字串抽出來。驗證：新舊 build 整頁文字與 aria-label 完全一致，只有 `<html lang>` 從 `zh-Hant` 改成 `zh-TW`
- [x] C2：`LocaleSwitcher`（header）、`LocaleSuggestion`（根目錄依瀏覽器語言提示，不自動轉址），`base` 改成 `/`，並補上 `en` 翻譯。驗證：`/en/` 除了刻意保留的專有名詞外沒有中文；ja-JP 瀏覽器會看到日文 banner，切換後到 `/ja/` 並記住選擇
- [x] `bun test`（17 pass）、`bun run check:locales`
- [ ] en 翻譯等 Miyago 審稿，尤其是保留原文的專有名詞：摘星、洞燭、桃極、肥皂、未夢、鯉魚、R團、打 call 招式名
- [x] C3：
  - `ja` 由 Claude 翻譯，等 Miyago 審稿。
  - `es`、`fr` 由 Claude 翻譯，footer 標示 machine-assisted。
  - `zh-CN` 由 `bun run gen:zh-cn` 產生（OpenCC twp→cn），並加上一張修正表處理圈內用語。
  - 作品清單改用 `---` 標記。
  - 驗證：6 種語言的 lang、切換器、作品清單、footer 註記都正確，console 0 error。
- [x] C1-C3 在 2026-09-29 一起 commit 並部署
- [ ] C4：每個語言各自的 `index.html`、`hreflang`、meta，以及 `check-locales.ts`
