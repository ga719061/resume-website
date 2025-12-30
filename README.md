# 📄 履歷生產器 (Resume Builder)

一個現代化、功能豐富的個人履歷網頁，純 HTML/CSS/JavaScript 實作，無需任何框架或後端。具備即時編輯、多主題切換、資料持久化及多格式匯出功能。

🔗 **線上預覽**: [https://ga719061.github.io/resume-website/](https://ga719061.github.io/resume-website/)

---

## ✨ v1.3 全新升級

- 🌸 **新增「可愛風格」主題**：粉嫩配色與大圓角設計。
- 🎨 **主題系統優化**：支援動態 CSS 變數切換，絲滑過渡。
- 🌍 **多語言增強**：介面翻譯完整覆蓋所有自訂板塊。
- ↩️ **Undo/Redo 系統**：編輯錯誤？一鍵撤銷或重做。
- 📦 **板塊管理**：支援拖曳排序與完全自訂的側邊欄區塊。

---

## 🚀 功能特點

### 🎨 多主題與自訂化
- **5 款預設主題**：🌙 深色霓虹、☀️ 淺色簡約、💼 藍色專業、🔮 紫色夢幻、🌸 可愛風格。
- **自訂主題**：自由調整背景色、主色調與強調色。
- **粒子背景**：具備視窗暫停優化與動畫偏好遵循。

### ✏️ 強大的編輯體驗
- **所見即所得**：直接點擊文字即可編輯。
- **靈活板塊**：10+ 種內容板塊（工作經歷、專案、統計數據、證書等）。
- **拖曳排序**：輕鬆調整內容順序。
- **圖片管理**：支援上傳個人頭像與專案圖片。

### 💾 資料安全與管理
- **自動儲存**：自動保存至 `localStorage`，每分鐘定時備份。
- **匯入/匯出**：支援 JSON 格式備份，隨時遷移資料。
- **儲存預警**：當快要超出瀏覽器儲存上限時給予警告。

### 📤 專業輸出
- **🖨️ 輸出 PDF**：針對 A4 紙張優化的預覽與列印。
- **🌐 輸出網頁**：匯出獨立的 HTML 檔案，包含所有樣式，方便分享。

---

## 📁 檔案結構

```
resume-website/
├── index.html   # 主頁面與 Modal 結構
├── style.css    # 核心樣式、主題變數、動畫效果
├── app.js       # 互動邏輯、編輯器引擎、資料備份
└── README.md    # 說明文件
```

---

## 🛠️ 技術棧

- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage API
- **Icons**: Emoji & CSS-based UI components
- **Optimization**: CSS Animation Performance, Lazy Loading

---

## 📝 快速開始

1. **Clone 專案**: `git clone https://github.com/ga719061/resume-website.git`
2. **開啟網頁**: 直接使用瀏覽器打開 `index.html`。
3. **進入編輯**: 點擊右下角 ⚙️ 齒輪並啟動 ✏️ 編輯模式。

---

## 📄 License

MIT License - Feel free to use and contribute!
