# CBAS 圖卡式教學簡報｜聚隆四 (14664) 實戰全解析

互動式可轉債（CB）與可轉債資產交換（CBAS）教學簡報，支援全螢幕簡報、A4 橫式 8 頁 PDF 匯出、反稀釋除息試算與單張投報率（最高現股 10 倍）模擬器。

## 如何發佈到 GitHub 並產生公開網頁

### 方法一：最簡單（免輸入指令）
1. 在右上角工具列點擊 **GitHub 圖示（Save to GitHub）**，登入並授權 GitHub 帳號後，直接建立新 Repository 即可完成上傳。
2. 進入您的 GitHub Repository → **Settings** → 左側 **Pages** → **Build and deployment / Source** 選擇 **GitHub Actions**，等待約 1 分鐘即會自動建置並產生公開網址。

### 方法二：下載專案後用終端機推上 GitHub
```bash
npm install
git init
git add .
git commit -m "Initial commit: CBAS tutorial presentation"
git branch -M main
git remote add origin https://github.com/您的帳號/您的倉庫名稱.git
git push -u origin main
```

## 本機開發與建置指令
- 啟動開發伺服器：`npm run dev`
- 靜態打包建置：`npm run build`（輸出至 `dist/`）
- TypeScript 型別檢查：`npm run lint`
