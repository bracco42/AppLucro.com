// Adicione ao tipo Language
type Language = 'pt' | 'en' | 'fr' | 'zh' | 'ja';

// Atualize o seletor de idiomas (adicione as novas opções)
<select 
  value={language}
  onChange={(e) => setLanguage(e.target.value as Language)}
  style={{
    padding: '5px',
    backgroundColor: '#0f0',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  }}
>
  <option value="pt">PT</option>
  <option value="en">EN</option>
  <option value="fr">FR</option>
  <option value="zh">中</option> {/* Chinês - 中 (abreviação comum para 中文) */}
  <option value="ja">日</option> {/* Japonês - 日 (abreviação comum para 日本語) */}
</select>

// Adicione as traduções para chinês e japonês no objeto translations
const translations = {
  // ... mantém as traduções existentes ...

  zh: { // Chinês Simplificado
    title: '行程利润计算器',
    subtitle: '用于短期和长期决策',
    registerButton: '注册车辆数据',
    closeButton: '关闭',
    saveButton: '保存',
    fuelPrice: '燃油价格(每升):',
    fuelEfficiency: '车辆油耗(公里/升):',
    insuranceValue: '保险价值:',
    insurancePremium: '保险溢价(每年10%事故概率):',
    maintenanceCosts: '维护成本(如适用包括租车):',
    addCost: '添加',
    remove: '删除',
    distance: '行驶距离(选择"每日"需考虑工作日):',
    vehicleValue: '车辆现值(租赁请设为零-年折旧3.33%):',
    rideValue: '行程收入:',
    rideDistance: '行程距离(公里):',
    shortTermProfit: '短期利润(扣除燃油费):',
    longTermProfit: '长期利润(扣除所有费用):',
    tips: '提示:',
    tip1: '1. 如租赁车辆，请将车辆价值设为零并将租金计入维护成本',
    tip2: '2. 所有字段均可设为零',
    formula: '长期利润公式:',
    community: '开源社区! Instagram联系bernard.bracco或Facebook联系Ehnov7id30或Bernard Diniz Bracco! 捐赠PIX:100.980.686-60',
    periodicityOptions: {
      annual: '年',
      monthly: '月',
      weekly: '周',
      daily: '日'
    }
  },

  ja: { // Japonês
    title: '配達利益計算',
    subtitle: '短期・長期の意思決定用',
    registerButton: '車両登録',
    closeButton: '閉じる',
    saveButton: '保存',
    fuelPrice: '燃料価格(1リットル):',
    fuelEfficiency: '燃費(km/リットル):',
    insuranceValue: '保険金額:',
    insurancePremium: '保険料(事故確率10%):',
    maintenanceCosts: '維持費(レンタル含む):',
    addCost: '追加',
    remove: '削除',
    distance: '走行距離(日次選択時は営業日考慮):',
    vehicleValue: '車両価値(レンタル時は0-年3.33%減価):',
    rideValue: '配達収入:',
    rideDistance: '走行距離(km):',
    shortTermProfit: '短期利益(燃料費控除):',
    longTermProfit: '長期利益(全費用控除):',
    tips: 'ヒント:',
    tip1: '1. レンタル車両は車両価値を0にし維持費にレンタル代を計上',
    tip2: '2. 全項目0設定可能',
    formula: '長期利益計算式:',
    community: 'オープンソース! Instagramでbernard.braccoかFacebookでEhnov7id30かBernard Diniz Braccoに連絡! 寄付PIX:100.980.686-60',
    periodicityOptions: {
      annual: '年',
      monthly: '月',
      weekly: '週',
      daily: '日'
    }
  }
};
