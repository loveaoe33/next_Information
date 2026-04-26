# Information 模組 - 重構與 Clean Code 說明文件

本文件記錄了 `Information` 模組的重構細節。本次重構的核心目標在於**提升程式碼可讀性 (Readability)**、**增強型別安全 (Type Safety)**、**修復潛在的效能與邏輯漏洞 (Bug Fixes)**，以及**統一錯誤處理與命名慣例 (Standardization)**。

---

## 🚀 核心重構重點 (Key Improvements)

1. **移除無用程式碼 (Dead Code Elimination)**
   - 清理了大量被註解掉的舊版測試程式碼、無用的 `useState`、未被呼叫的函式 (如 `viewAlert`, `test`) 以及錯誤的系統引入 (如 `next/dist/server/lib/render-server`)。
2. **TypeScript 型別最佳化 (TypeScript Best Practices)**
   - 統一使用基礎型別 (`string`, `boolean`) 替代物件型別 (`String`, `Boolean`)。
   - 為所有 Component 定義了專屬且精簡的 Props Interface (例如 `ModalManagerProps`, `ModalDetailProps`)，並移除了未使用的屬性傳遞。
3. **統一的錯誤與例外處理 (Error Handling)**
   - 規範了 API 呼叫的錯誤攔截邏輯：在 `!res.ok` 時即時拋出 Error，避免後續解析 JSON 時崩潰。
   - 統一將 API 斷線的錯誤訊息修改為 `Server connection error during [action]`。
   - 導入並統一使用 `react-toastify` 取代原本破壞體驗的 `alert()`。
4. **React 效能與語法優化 (React Optimizations)**
   - 解決了迴圈渲染 (`.map`) 缺少 `key` 的 Warning。
   - 改善了 `useEffect` 的監聽機制，透過 `useRef` 保存先前的資料狀態並搭配 `lodash/isEqual` 進行深層比對，避免不必要的重新渲染。
   - 將條件渲染從 `item.showbool === true ? <li/> : ""` 簡化為 `item.showbool && <li/>` (Short-circuit evaluation)。
5. **JSDoc 英文註解標標準化**
   - 為所有的介面、類別、元件及主要函式補上了標準的 JSDoc 英文註解，大幅提升後續維護與協作的效率。

---

## 📂 檔案功能與邏輯細部解說

### 1. 狀態與 API 封裝層
- **`lib/information_state.tsx`**
  - **功能**：負責與後端進行資料溝通，採用物件導向設計。
  - **邏輯**：
    - 定義了共用的 `Category` 介面，規範所有階層的分類都必須實作 CRUD (`add`, `delete`, `update`, `fetchs`) 及顯示控制 (`hide`, `shows`)。
    - 實作了 `MajorCategory` (大項)、`MidCategory` (中項)、`MinorCategory` (小項/樹狀)。
    - **重構亮點**：修復了 `MidCategory` 和 `MinorCategory` 在 `hide` 操作時錯誤將狀態設為 `true` 的邏輯漏洞；加上了 `toJSON` 方法以正確序列化私有屬性。

### 2. 核心視圖與控制器
- **`main.tsx`**
  - **功能**：應用程式的根元件，負責協調 Sidebar 選單、抓取資料 (Fetch Data) 及切換畫面版型 (Template)。
  - **邏輯**：
    - 使用 `useEffect` 在初次載入時抓取所有層級的類別資料 (`headData`, `kidData`, `treeData`)。
    - 實作原生的 DOM 操作以控制 Sidebar 收合 (`toggleSidebar`, `toggleMenu`)。
  - **重構亮點**：修復了 `fetch_Information` 函式中 `switch-case` 忘記加 `break` 導致資料重複抓取的嚴重漏洞。

- **`template_md.tsx`**
  - **功能**：前台商品展示畫面，包含一個支援「滑鼠拖曳滾動」的水平商品輪播 (Slider)。
  - **邏輯**：
    - 監聽 `onMouseDown`, `onMouseMove`, `onMouseUp` 事件來實現拖曳滾動 (`isDragging`)。
    - 安全地解析 `content_json` 並動態渲染圖片與介紹。
  - **重構亮點**：修正了 API 屬性拼字 (`contentJson` -> `content_json`)，確保資料能正確帶出；並移除了錯誤包裹的 `<body>` 標籤，避免 Hydration Error。

- **`manager.tsx`**
  - **功能**：後台管理介面的靜態切版/舊版測試頁。
  - **重構亮點**：將所有的輸入框與 React `useState` 綁定，轉化為受控組件 (Controlled Components)，並補上 TODO 註解為未來串接保留彈性。

### 3. 互動式彈跳視窗 (Modals)
- **`modal/modal_login.tsx`**
  - **功能**：管理員登入介面。
  - **邏輯**：接收使用者輸入的帳號密碼，打 `/api/adminLogin` 驗證，並根據回傳結果透過 Toast 顯示成功或錯誤訊息。
  - **重構亮點**：加入 `try...catch` 保護，避免後端回傳非標準 JSON 時導致前端畫面崩潰。

- **`modal/modal_manager.tsx`**
  - **功能**：後端類別管理中心 (Manager Dashboard)。
  - **邏輯**：
    - 提供大項、中項、小項的 CRUD 操作介面。
    - 針對已存在/已隱藏的類別分開渲染，並可以切換顯示狀態。
  - **重構亮點**：將原先散落在各處的 `alert()` 除錯訊息徹底移除，統一改用封裝好的 `errorAlert` / `successAlert`。函式命名從 `stateMajorCategoty` 修改為語意更精確的 `toggleMajorCategoryVisibility`。

- **`modal/modal_manager_detail.tsx`**
  - **功能**：特定商品小項 (Minor Category) 的詳細內容編輯器 (JSON Builder)。
  - **邏輯**：
    - 透過 `nanoid` 給予每一筆新增的商品獨立的 `jsonCode`。
    - 可以動態組合出一個包含商品抬頭、介紹、價格、圖片網址等資訊的 JSON 陣列，並透過 `updateMinorCategory` 回存至資料庫。
  - **重構亮點**：將預設空物件 `initialTreeObject` 抽離元件外部以節省記憶體；實作完整的表單驗證機制 (`validateContent`)，確保必填欄位不為空。

- **`modal/modal_product.tsx`**
  - **功能**：前台商品詳情展示彈跳視窗。
  - **邏輯**：接收由 `template_md.tsx` 傳入的特定商品資料，進行 JSON 解析後，渲染完整的商品規格、介紹與價格。
  - **重構亮點**：封裝了安全的解析函式 `renderContent` 並定義了嚴謹的回傳型別 `RenderResult`，將解析狀態分為 `empty`, `notReady`, `error`, `success`，使畫面更容易針對異常狀態進行處理。

---

## 💡 開發與維護指南 (Developer Guide)

1. **新增分類層級或欄位時**：
   - 請先於 `lib/information_state.tsx` 更新對應的 Class 屬性及 `toJSON()` 方法。
   - 若是新增商品詳細內容欄位，需同步更新 `modal_manager_detail.tsx` 中的 `treeContent` 型別與 `initialTreeObject`。
2. **關於 Toastify 通知**：
   - 目前通知邏輯統一寫在各個 Modal 內部，若未來要在整個應用程式共用，可考慮將 `ToastContainer` 移至 `layout.tsx` 或根元件中。
3. **關於 DOM 操作的優化方向**：
   - `main.tsx` 中的 Sidebar 收合目前採用 `document.getElementById(...).classList.toggle(...)`。在未來的開發中，建議可將此部分重構為 React State (例如 `isSidebarOpen`) 以符合宣告式 (Declarative) UI 的設計哲學。
