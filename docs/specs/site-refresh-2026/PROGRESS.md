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

### 備註

- `FandomSection.vue` 會把含有「、」的 detail 當成作品清單拆開顯示，所以一般說明文字不要用「、」。

## Phase C：多語系（未開始，依賴 B 的內容定稿）

- [ ] C1：`useLocale` 與 overlay 結構，把寫死的字串抽出來（只有 zh-TW，畫面不變）
- [ ] C2：語言切換器，加上 `en`
- [ ] C3：`ja`、`es`、`fr`，以及 OpenCC 產生的 `zh-CN`
- [ ] C4：每個語言各自的 `index.html`、`hreflang`、meta，以及 `check-locales.ts`
