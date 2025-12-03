version: 1.0.0
last_updated: 2024-05-20
status: Approved
project_name: AdCopy Inspiration Library (AI-Gen Edition)
type: AI-Native Web Application

# ==========================================
# 1. 策略基礎 (Strategic Foundation)
# ==========================================
strategy:
  goal: >
    打造一個即時 AI 廣告文案生成器，協助使用者快速獲取高轉化率的廣告靈感，
    並透過模擬數據輔助決策，最終建立個人的文案資產庫。
  target_audience:
    - 電商小編 (E-commerce Editors)
    - 專業廣告投放手 (Pro Ad Buyers)
    - 獨立開發者 (Indie Developers)
  value_proposition:
    - AI 即時生成：針對特定場景現場產出，非靜態資料庫。
    - 數據輔助：每條文案附帶 AI 預測的「模擬點擊率 (CTR)」，範圍 1.5% - 5.0%。
    - 細緻分類：支援行業、情感、平台、長度等多維度控制。

# ==========================================
# 2. 系統架構與上下文 (System Context)
# ==========================================
context:
  domain:
    industry: Digital Marketing / Ad Tech
    compliance:
      - 嚴格禁止誇大不實 (Exaggerated claims)
      - 禁止醫療療效宣稱 (Medical claims)
      - 符合各大平台 (FB/IG/Google) 廣告規範
  
  technology_stack:
    frontend: React (Latest) + Tailwind CSS
    backend_service: Firebase (Auth, Firestore for saved collections)
    ai_engine:
      provider: OpenAI (GPT-4o) OR Anthropic (Claude 3.5 Sonnet)
      role: Real-time Content Generator
      response_format: JSON Object (Strict Mode)

# ==========================================
# 3. 功能需求 (Functional Requirements)
# ==========================================
features:
  ui_layout:
    search_bar:
      type: Input Field
      purpose: 使用者輸入產品名稱或核心關鍵字 (作為 Prompt 的 Subject)。
    filters:
      taxonomy:
        industry: [美妝, 3C, 服飾, 食品, 金融, 其他]
        emotion: [幽默, 恐懼(痛點), 溫馨, 專業, 緊迫]
        platform: [Facebook, Instagram, Google Ads]
        length: [短文案(<50字), 中長文案, 長故事]
    display_area:
      style: Grid Card Layout (Responsive)
      elements_per_card:
        - Headline (標題)
        - Body Text (內文)
        - Tags (平台/情感)
        - Predicted Metrics (AI 模擬 CTR)
        - Actions: [Copy to Clipboard], [Save to Library (Firebase)]

  interaction_flow:
    trigger: User clicks "Generate"
    process:
      1. Frontend collects inputs (Keyword + Filters).
      2. Construct System Prompt with constraints.
      3. Call LLM API (Stream enabled).
      4. Parse JSON stream to UI.
    output: Render 3 distinct ad cards.

# ==========================================
# 4. 數據結構 (Data Schema)
# ==========================================
data_schema:
  # AI 輸出的 JSON 結構定義 (供 LLM 遵循)
  ad_card_object:
    type: object
    properties:
      id:
        type: string (uuid)
      headline:
        type: string
        description: 吸睛標題
      body:
        type: string
        description: 廣告主文案，需符合平台風格
      tags:
        type: array
        items: string
      predicted_ctr:
        type: float
        range: [1.5, 5.0]
        description: AI 基於文案吸引力模擬的點擊率數值
      rationale:
        type: string
        description: (Optional) AI 解釋為什麼這段文案會有效
    required: [headline, body, predicted_ctr]

# ==========================================
# 5. 非功能性需求 (NFRs) - 核心指標
# ==========================================
nfrs:
  performance:
    time_to_first_token (TtFT): "< 1.5 seconds"
    generation_batch_size: 3 cards per request
    streaming: true (Mandatory for UX)
  
  quality_assurance:
    json_parse_error_rate: "< 0.1%" (Must use JSON Mode/Function Calling)
    tag_consistency: "> 90%" (幽默的文案必須真的幽默)
    hallucination_safety: Strict filtering of non-compliant claims.

  metrics_logic:
    ctr_simulation: "Random float weighted by copy quality score, strictly between 1.5% and 5.0%."

# ==========================================
# 6. 提示詞工程指引 (Prompt Engineering Guide)
# ==========================================
prompt_strategy:
  role_definition: "你是一位擁有 10 年經驗的資深廣告文案撰寫專家 (Copywriter) 與數據分析師。"
  constraints:
    - 輸出必須是純 JSON Array，包含 3 個物件。
    - 嚴格遵守使用者選擇的「平台」風格（例如 IG 重視 Emoji 與視覺感，Google Ads 重視簡潔與關鍵字）。
    - 安全過濾：若輸入包含違禁品或醫療宣稱，回傳特定 Error Code 而非生成文案。
