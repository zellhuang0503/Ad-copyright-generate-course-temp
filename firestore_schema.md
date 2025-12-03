// Collection: users
// Document ID: {uid} (From Firebase Auth)
{
  "uid": "7a8b9c...",
  "email": "editor@example.com",
  "display_name": "Pro Marketer",
  "photo_url": "https://...",
  "created_at": Timestamp,
  
  // ⚠️ AI 專屬欄位：用於限流與計費
  "credits": {
    "total_generated": 150,    // 總生成次數 (張數)
    "remaining_balance": 500,  // 剩餘代幣或次數
    "subscription_tier": "pro" // "free", "pro"
  },
  
  // 使用者偏好設定 (如預設選取的行業)
  "preferences": {
    "default_industry": "美妝",
    "default_platform": "Instagram"
  }
}

// Collection: saved_ads
// Document ID: {auto-generated-uuid}
{
  "id": "ad_12345...",
  "user_id": "7a8b9c...", // 關聯到 users
  
  // 核心內容 (來自 AI 生成結果)
  "content": {
    "headline": "髮際線和你，誰退得比較快？👀",
    "body": "別讓你的額頭變成停機坪！...",
    "rationale": "利用自嘲式的幽默感..."
  },
  
  // 數據指標
  "metrics": {
    "predicted_ctr": 4.2,
    "user_rating": 5 // (Optional) 使用者自己給這篇文案打分
  },
  
  // 🏷️ 生成上下文 (Context Metadata) - 關鍵！
  // 讓使用者知道這篇文案是基於什麼條件生成的
  "generation_context": {
    "keyword": "防脫髮洗髮精",
    "industry": "美妝",
    "emotion": "幽默",
    "platform": "Instagram",
    "length": "短文案"
  },
  
  "tags": ["幽默", "Instagram", "美妝", "收藏"], // 方便前端快速篩選
  "created_at": Timestamp,
  "is_archived": false
}

// Collection: generation_logs
// Document ID: {auto-generated-uuid}
{
  "user_id": "7a8b9c...",
  "timestamp": Timestamp,
  "prompt_snapshot": "...", // 當時發送給 LLM 的完整 Prompt
  "model_used": "gpt-4o",
  "token_usage": {
    "prompt_tokens": 120,
    "completion_tokens": 350,
    "total_tokens": 470
  },
  "latency_ms": 1450, // 記錄生成耗時 (監控 NFRs)
  "status": "success" // or "error" (e.g., content_filter trigger)
}
