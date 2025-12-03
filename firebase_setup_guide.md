# 如何獲取 Firebase Config 與設定專案

本指南將協助您一步步取得 Firebase Config 並完成基礎設定。

## 步驟 1：建立 Firebase 專案
1. 前往 [Firebase Console](https://console.firebase.google.com/)。
2. 點擊 **"Add project" (新增專案)**。
3. 輸入專案名稱（例如：`AdCopy-Gen`），點擊 **Continue**。
4. (選擇性) Google Analytics 可以先關閉或開啟，點擊 **Create project**。
5. 等待專案建立完成，點擊 **Continue** 進入專案主頁。

## 步驟 2：註冊 Web 應用程式
1. 在專案主頁 (Project Overview) 中央，點擊 **Web 圖示 (</>)**。
2. **App nickname**: 輸入 `AdCopy Web` (或您喜歡的名字)。
3. (選擇性) "Also set up Firebase Hosting" 先**不要**勾選。
4. 點擊 **Register app**。

## 步驟 3：取得 Firebase Config
1. 註冊完成後，您會看到 "Add Firebase SDK" 的區塊。
2. 找到 `const firebaseConfig = { ... };` 的程式碼片段。
3. **複製** 這段物件內容（包含 apiKey, authDomain, projectId 等欄位）。
   > 請將這段 Config 貼給 AI，或稍後貼入專案的 `src/services/firebase.ts` 中。

## 步驟 4：啟用 Authentication (Google 登入)
1. 在左側選單點擊 **Build** -> **Authentication**。
2. 點擊 **Get started**。
3. 在 "Sign-in method" 分頁中，選擇 **Google**。
4. 點擊右上角的 **Enable** 開關。
5. **Support email for project**: 選擇您的 Email。
6. 點擊 **Save**。

## 步驟 5：建立 Firestore Database
1. 在左側選單點擊 **Build** -> **Firestore Database**。
2. 點擊 **Create database**。
3. **Location**: 選擇離您最近的節點 (例如 `asia-east1` 台灣，或 `us-central1`)。
4. **Security rules**: 選擇 **Start in test mode** (測試模式)，方便初期開發（我們稍後會套用 `firestore.rules`）。
5. 點擊 **Create**。

---

完成以上步驟後，您就準備好開始開發了！請提供 `firebaseConfig` 給我，以便進行下一步。
