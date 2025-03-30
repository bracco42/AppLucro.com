'use client';

import React, { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

type Periodicity = 'annual' | 'monthly' | 'daily' | 'weekly';
type Cost = {
  id: number;
  valor: number;
  periodicity: Periodicity;
};
type Language = 'pt' | 'en' | 'fr' | 'zh' | 'ja' | 'ar' | 'de' | 'ru' | 'uk' | 'da' | 'tr' | 'sw';

const translations = {
  pt: {
    title: 'Funcionalidade Para Calcular Lucros de Corridas',
    subtitle: 'Destinado à tomada de decisões de curto e longo prazo',
    registerButton: 'Cadastrar Dados do Veículo',
    closeButton: 'Fechar Cadastro',
    saveButton: 'Salvar',
    fuelPrice: 'Preço do Combustível (por litro):',
    fuelEfficiency: 'Km/L (Mi/L ou outra medida de distância por litro) feitos pelo veículo:',
    insuranceValue: 'Valor do Seguro:',
    insurancePremium: 'Prêmio do Seguro (x10% de probabilidade de batida ao ano):',
    maintenanceCosts: 'Custos de Manutenção (inclua aluguel do veículo aqui se aplicável):',
    addCost: 'Adicionar Custo',
    remove: 'Remover',
    distance: 'Distância percorrida (se selecionar "Diária" e trabalhar mais que 5x na semana precisa aumentar o valor desse campo, que considera dias úteis):',
    vehicleValue: 'Valor Atual do Veículo se Comprado (deixe zero se for alugado - deprecia 3.33% no ano):',
    rideValue: 'Valor Pago App/Cliente:',
    rideDistance: 'Km/Mi da Corrida (distância percorrida):',
    shortTermProfit: 'Lucro de Curto Prazo (desconta custo do combustível):',
    longTermProfit: 'Lucro de Longo Prazo (desconta custo do combustível e todos os outros):',
    tips: 'Dicas:',
    tip1: '1. Se você aluga o veículo, deixe o valor do veículo como zero e inclua o valor do aluguel nos custos de manutenção.',
    tip2: '2. Todos os campos podem ser zero sem afetar o cálculo.',
    formula: 'Fórmula do Lucro de Longo Prazo:',
    community: 'Comunidade Open Source! Falar com bernard.bracco no Instagram ou Ehnov7id30 ou Bernard Diniz Bracco no Facebook! Para doações segue o PIX: 100.980.686-60. Custos até então: 4 semanas de mão de obra e 80 reais. Receita até então: 0.',
    periodicityOptions: {
      annual: 'Anual',
      monthly: 'Mensal',
      weekly: 'Semanal',
      daily: 'Diário'
    }
  },
  en: {
    title: 'Ride Profit Calculation Feature',
    subtitle: 'Designed for short and long term decision making',
    registerButton: 'Register Vehicle Data',
    closeButton: 'Close Registration',
    saveButton: 'Save',
    fuelPrice: 'Fuel Price (per liter):',
    fuelEfficiency: 'Km/L (Mi/L or other distance measure per liter) achieved by the vehicle:',
    insuranceValue: 'Insurance Value:',
    insurancePremium: 'Insurance Premium (x10% probability of accident per year):',
    maintenanceCosts: 'Maintenance Costs (include vehicle rental here if applicable):',
    addCost: 'Add Cost',
    remove: 'Remove',
    distance: 'Distance traveled (if selecting "Daily" and working more than 5x a week, you need to increase this value, which considers working days):',
    vehicleValue: 'Current Vehicle Value if Purchased (set to zero if rented - depreciates 3.33% per year):',
    rideValue: 'App/Customer Paid Value:',
    rideDistance: 'Km/Mi of the Ride (distance traveled):',
    shortTermProfit: 'Short Term Profit (deducts fuel cost):',
    longTermProfit: 'Long Term Profit (deducts fuel cost and all other expenses):',
    tips: 'Tips:',
    tip1: '1. If you rent the vehicle, set the vehicle value to zero and include the rental value in maintenance costs.',
    tip2: '2. All fields can be zero without affecting the calculation.',
    formula: 'Long Term Profit Formula:',
    community: 'Open Source Community! Contact bernard.bracco on Instagram or Ehnov7id30 or Bernard Diniz Bracco on Facebook! For donations, PIX: 100.980.686-60. Costs so far: 4 weeks of work and 80 reais. Revenue so far: 0.',
    periodicityOptions: {
      annual: 'Annual',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily'
    }
  },
  fr: {
    title: 'Fonctionnalité de Calcul de Profit des Courses',
    subtitle: 'Conçu pour la prise de décision à court et long terme',
    registerButton: 'Enregistrer les Données du Véhicule',
    closeButton: 'Fermer l\'Enregistrement',
    saveButton: 'Enregistrer',
    fuelPrice: 'Prix du Carburant (par litre):',
    fuelEfficiency: 'Km/L (Mi/L ou autre mesure de distance par litre) réalisés par le véhicule:',
    insuranceValue: 'Valeur de l\'Assurance:',
    insurancePremium: 'Prime d\'Assurance (x10% de probabilité d\'accident par an):',
    maintenanceCosts: 'Coûts de Maintenance (inclure la location du véhicule ici si applicable):',
    addCost: 'Ajouter un Coût',
    remove: 'Supprimer',
    distance: 'Distance parcourue (si vous sélectionnez "Quotidien" et travaillez plus de 5x par semaine, vous devez augmenter cette valeur, qui considère les jours ouvrables):',
    vehicleValue: 'Valeur Actuelle du Véhicule si Acheté (mettez zéro si loué - déprécie 3.33% par an):',
    rideValue: 'Valeur Payée par l\'App/Client:',
    rideDistance: 'Km/Mi de la Course (distance parcourue):',
    shortTermProfit: 'Profit à Court Terme (déduit le coût du carburant):',
    longTermProfit: 'Profit à Long Terme (déduit le coût du carburant et tous les autres):',
    tips: 'Conseils:',
    tip1: '1. Si vous louez le véhicule, mettez la valeur du véhicule à zéro et incluez la valeur de la location dans les coûts de maintenance.',
    tip2: '2. Tous les champs peuvent être zéro sans affecter le calcul.',
    formula: 'Formule du Profit à Long Terme:',
    community: 'Communauté Open Source! Contactez bernard.bracco sur Instagram ou Ehnov7id30 ou Bernard Diniz Bracco sur Facebook! Pour les dons, PIX: 100.980.686-60. Coûts jusqu\'à présent: 4 semaines de travail et 80 reais. Revenus jusqu\'à présent: 0.',
    periodicityOptions: {
      annual: 'Annuel',
      monthly: 'Mensuel',
      weekly: 'Hebdomadaire',
      daily: 'Quotidien'
    }
  },
  zh: {
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
  ja: {
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
  },
  ar: {
    title: 'حاسبة ربح الرحلات',
    subtitle: 'لصنع القرارات قصيرة وطويلة المدى',
    registerButton: 'تسجيل بيانات المركبة',
    closeButton: 'إغلاق',
    saveButton: 'حفظ',
    fuelPrice: 'سعر الوقود (لتر):',
    fuelEfficiency: 'كفاءة الوقود (كم/لتر):',
    insuranceValue: 'قيمة التأمين:',
    insurancePremium: 'قسط التأمين (10% احتمال حادث سنوياً):',
    maintenanceCosts: 'تكاليف الصيانة (بما في ذلك الإيجار إن وجد):',
    addCost: 'إضافة',
    remove: 'إزالة',
    distance: 'المسافة المقطوعة (يومياً مع مراعاة أيام العمل):',
    vehicleValue: 'قيمة المركبة (صفر إذا كانت مستأجرة - إهلاك 3.33% سنوياً):',
    rideValue: 'قيمة الرحلة:',
    rideDistance: 'مسافة الرحلة (كم):',
    shortTermProfit: 'الربح قصير المدى (بعد خصم الوقود):',
    longTermProfit: 'الربح طويل المدى (بعد خصم جميع التكاليف):',
    tips: 'نصائح:',
    tip1: '1. عند استئجار المركبة، اضبط القيمة على صفر وأضف الإيجار إلى تكاليف الصيانة',
    tip2: '2. يمكن ترك جميع الحقول صفر دون تأثير',
    formula: 'معادلة الربح طويل المدى:',
    community: 'مصدر مفتوح! تواصل عبر Instagram bernard.bracco أو Facebook Ehnov7id30 أو Bernard Diniz Bracco! التبرعات: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'سنوي',
      monthly: 'شهري',
      weekly: 'أسبوعي',
      daily: 'يومي'
    }
  },
  de: {
    title: 'Fahrtkostenberechnung',
    subtitle: 'Für kurzfristige und langfristige Entscheidungen',
    registerButton: 'Fahrzeugdaten registrieren',
    closeButton: 'Schließen',
    saveButton: 'Speichern',
    fuelPrice: 'Kraftstoffpreis (pro Liter):',
    fuelEfficiency: 'Kraftstoffverbrauch (km/Liter):',
    insuranceValue: 'Versicherungswert:',
    insurancePremium: 'Versicherungsprämie (10% Unfallwahrscheinlichkeit):',
    maintenanceCosts: 'Wartungskosten (inkl. Miete falls zutreffend):',
    addCost: 'Hinzufügen',
    remove: 'Entfernen',
    distance: 'Fahrstrecke (bei "Täglich" Arbeitstage berücksichtigen):',
    vehicleValue: 'Fahrzeugwert (0 bei Miete - 3.33% jährliche Wertminderung):',
    rideValue: 'Fahrtentgelt:',
    rideDistance: 'Fahrstrecke (km):',
    shortTermProfit: 'Kurzfristiger Gewinn (abzgl. Kraftstoff):',
    longTermProfit: 'Langfristiger Gewinn (abzgl. aller Kosten):',
    tips: 'Tipps:',
    tip1: '1. Bei Mietfahrzeugen Wert auf 0 setzen und Miete zu Wartungskosten addieren',
    tip2: '2. Alle Felder können 0 sein',
    formula: 'Langfristige Gewinnformel:',
    community: 'Open Source! Kontakt: Instagram bernard.bracco oder Facebook Ehnov7id30 oder Bernard Diniz Bracco! Spenden: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Jährlich',
      monthly: 'Monatlich',
      weekly: 'Wöchentlich',
      daily: 'Täglich'
    }
  },
  ru: {
    title: 'Калькулятор прибыли',
    subtitle: 'Для краткосрочных и долгосрочных решений',
    registerButton: 'Регистрация данных ТС',
    closeButton: 'Закрыть',
    saveButton: 'Сохранить',
    fuelPrice: 'Цена топлива (за литр):',
    fuelEfficiency: 'Расход топлива (км/литр):',
    insuranceValue: 'Страховая стоимость:',
    insurancePremium: 'Страховая премия (10% вероятность аварии):',
    maintenanceCosts: 'Затраты на обслуживание (включая аренду):',
    addCost: 'Добавить',
    remove: 'Удалить',
    distance: 'Пробег (если "Ежедневно" учитывайте рабочие дни):',
    vehicleValue: 'Стоимость ТС (0 если аренда - амортизация 3.33% годовых):',
    rideValue: 'Доход за поездку:',
    rideDistance: 'Расстояние (км):',
    shortTermProfit: 'Краткосрочная прибыль (за вычетом топлива):',
    longTermProfit: 'Долгосрочная прибыль (за вычетом всех расходов):',
    tips: 'Советы:',
    tip1: '1. Для арендованных ТС установите стоимость 0 и включите аренду в затраты',
    tip2: '2. Все поля могут быть нулевыми',
    formula: 'Формула долгосрочной прибыли:',
    community: 'Open Source! Контакты: Instagram bernard.bracco или Facebook Ehnov7id30 или Bernard Diniz Bracco! Пожертвования: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Год',
      monthly: 'Месяц',
      weekly: 'Неделя',
      daily: 'День'
    }
  },
  uk: {
    title: 'Калькулятор прибутку',
    subtitle: 'Для прийняття рішень',
    registerButton: 'Реєстрація даних ТЗ',
    closeButton: 'Закрити',
    saveButton: 'Зберегти',
    fuelPrice: 'Ціна палива (за літр):',
    fuelEfficiency: 'Витрата палива (км/літр):',
    insuranceValue: 'Страхова вартість:',
    insurancePremium: 'Страхова премія (10% ймовірність аварії):',
    maintenanceCosts: 'Витрати на обслуговування (включаючи оренду):',
    addCost: 'Додати',
    remove: 'Видалити',
    distance: 'Пробіг (якщо "Щодня" враховуйте робочі дні):',
    vehicleValue: 'Вартість ТЗ (0 при оренді - амортизація 3.33% річних):',
    rideValue: 'Дохід за поїздку:',
    rideDistance: 'Відстань (км):',
    shortTermProfit: 'Краткостроковий прибуток (за вирахуванням палива):',
    longTermProfit: 'Довгостроковий прибуток (за вирахуванням витрат):',
    tips: 'Поради:',
    tip1: '1. Для орендованих ТЗ встановіть вартість 0 та додайте оренду до витрат',
    tip2: '2. Всі поля можуть бути нульовими',
    formula: 'Формула довгострокового прибутку:',
    community: 'Open Source! Контакти: Instagram bernard.bracco або Facebook Ehnov7id30 або Bernard Diniz Bracco! Донати: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Рік',
      monthly: 'Місяць',
      weekly: 'Тиждень',
      daily: 'День'
    }
  },
  da: {
    title: 'Kørselsprofitberegner',
    subtitle: 'Til kortsigtet og langsigtet beslutningstagning',
    registerButton: 'Registrer køretøjsdata',
    closeButton: 'Luk',
    saveButton: 'Gem',
    fuelPrice: 'Brændstofpris (per liter):',
    fuelEfficiency: 'Brændstoføkonomi (km/l):',
    insuranceValue: 'Forsikringsværdi:',
    insurancePremium: 'Forsikringspræmie (10% uheldssandsynlighed):',
    maintenanceCosts: 'Vedligeholdelsesomkostninger (inkl. leje hvis relevant):',
    addCost: 'Tilføj',
    remove: 'Fjern',
    distance: 'Kørt afstand (ved "Dagligt" overvej arbejdsdage):',
    vehicleValue: 'Køretøjsværdi (0 ved leje - 3.33% årlig afskrivning):',
    rideValue: 'Kørselsindtægt:',
    rideDistance: 'Kørselsafstand (km):',
    shortTermProfit: 'Kortsigtet profit (fratrukket brændstof):',
    longTermProfit: 'Langsigtet profit (fratrukket alle omkostninger):',
    tips: 'Tips:',
    tip1: '1. Ved leje af køretøj, sæt værdi til 0 og inkluder leje i omkostninger',
    tip2: '2. Alle felter kan være 0',
    formula: 'Langsigtet profitformel:',
    community: 'Open Source! Kontakt: Instagram bernard.bracco eller Facebook Ehnov7id30 eller Bernard Diniz Bracco! Donationer: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Årlig',
      monthly: 'Månedlig',
      weekly: 'Ugentlig',
      daily: 'Daglig'
    }
  },
  tr: {
    title: 'Sürüş Kar Hesaplayıcı',
    subtitle: 'Kısa ve uzun vadeli kararlar için',
    registerButton: 'Araç Kaydı',
    closeButton: 'Kapat',
    saveButton: 'Kaydet',
    fuelPrice: 'Yakıt Fiyatı (litre):',
    fuelEfficiency: 'Yakıt Verimliliği (km/litre):',
    insuranceValue: 'Sigorta Değeri:',
    insurancePremium: 'Sigorta Primi (%10 kaza ihtimali):',
    maintenanceCosts: 'Bakım Maliyetleri (kiralama dahil):',
    addCost: 'Ekle',
    remove: 'Sil',
    distance: 'Mesafe ("Günlük" seçilirse iş günleri dikkate alınır):',
    vehicleValue: 'Araç Değeri (kiralık ise 0 - yıllık %3.33 amortisman):',
    rideValue: 'Sürüş Geliri:',
    rideDistance: 'Sürüş Mesafesi (km):',
    shortTermProfit: 'Kısa Vadeli Kar (yakıt maliyeti düşülür):',
    longTermProfit: 'Uzun Vadeli Kar (tüm maliyetler düşülür):',
    tips: 'İpuçları:',
    tip1: '1. Kiralık araçlarda değeri 0 yapın ve kira maliyetlere ekleyin',
    tip2: '2. Tüm alanlar 0 olabilir',
    formula: 'Uzun Vadeli Kar Formülü:',
    community: 'Açık Kaynak! İletişim: Instagram bernard.bracco veya Facebook Ehnov7id30 veya Bernard Diniz Bracco! Bağışlar: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Yıllık',
      monthly: 'Aylık',
      weekly: 'Haftalık',
      daily: 'Günlük'
    }
  },
  sw: {
    title: 'Kikokotoo cha Faida ya Usafiri',
    subtitle: 'Kwa maamuzi ya muda mfupi na mrefu',
    registerButton: 'Sajili Data ya Gari',
    closeButton: 'Funga',
    saveButton: 'Hifadhi',
    fuelPrice: 'Bei ya Mafuta (kwa lita):',
    fuelEfficiency: 'Ufanisi wa Mafuta (km/lita):',
    insuranceValue: 'Thamani ya Bima:',
    insurancePremium: 'Malipo ya Bima (10% uwezekano wa ajali):',
    maintenanceCosts: 'Gharama za Ukarabati (pamoja na kodi ya kukodisha ikiwa inatumika):',
    addCost: 'Ongeza',
    remove: 'Ondoa',
    distance: 'Umbali (ikiwa "Kila Siku" fanya kazi zaidi ya siku 5 kwa wiki):',
    vehicleValue: 'Thamani ya Gari (0 kama imekodishwa - kushuka kwa thamani 3.33% kwa mwaka):',
    rideValue: 'Mapato ya Safari:',
    rideDistance: 'Umbali wa Safari (km):',
    shortTermProfit: 'Faida ya Muda Mfupi (baada ya mafuta):',
    longTermProfit: 'Faida ya Muda Mrefu (baada ya gharama zote):',
    tips: 'Vidokezo:',
    tip1: '1. Kwa gari zilizokodishwa, weka thamani ya 0 na ongeza kodi kwenye gharama',
    tip2: '2. Sehemu zote zinaweza kuwa 0',
    formula: 'Fomula ya Faida ya Muda Mrefu:',
    community: 'Chanzo Wazi! Wasiliana: Instagram bernard.bracco au Facebook Ehnov7id30 au Bernard Diniz Bracco! Michango: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Mwaka',
      monthly: 'Mwezi',
      weekly: 'Wiki',
      daily: 'Siku'
    }
  }
};

export default function CalculoLucro() {
  const [isClient, setIsClient] = useState(false);
  const [precoCombustivel, setPrecoCombustivel] = useState<number>(5);
  const [kmPorLitro, setKmPorLitro] = useState<number>(35);
  const [valorSeguro, setValorSeguro] = useState<number>(2000);
  const [periodicidadeSeguro, setPeriodicidadeSeguro] = useState<Periodicity>('annual');
  const [premioSeguro, setPremioSeguro] = useState<number>(4000);
  const [custosManutencao, setCustosManutencao] = useState<Cost[]>([{id: 1, valor: 20000, periodicity: 'annual'}]);
  const [distanciaPercorrida, setDistanciaPercorrida] = useState<number>(250);
  const [periodicidadeDistancia, setPeriodicidadeDistancia] = useState<Periodicity>('daily');
  const [valorVeiculo, setValorVeiculo] = useState<number>(15000);
  const [valorCorrida, setValorCorrida] = useState<number>(15);
  const [KmRodados, setKmRodados] = useState<number>(10);
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState<number | null>(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    setIsClient(true);
    calcularLucros();
  }, [precoCombustivel, kmPorLitro, valorSeguro, periodicidadeSeguro, premioSeguro, custosManutencao, distanciaPercorrida, periodicidadeDistancia, valorVeiculo, valorCorrida, KmRodados]);

  const t = translations[language];

  if (!isClient) {
    return <div style={{ 
      textAlign: 'center', 
      padding: '20px', 
      backgroundColor: '#000', 
      color: '#fff',
      minHeight: '100vh'
    }}>Carregando...</div>;
  }

  const calcularLucros = () => {
    if ([precoCombustivel, kmPorLitro, valorSeguro, distanciaPercorrida, valorVeiculo, valorCorrida, KmRodados].some(val => isNaN(val))) {
      setLucroCurtoPrazo(null);
      setLucroLongoPrazo(null);
      return;
    }

    const custoCombustivelPorKm = kmPorLitro > 0 ? precoCombustivel / kmPorLitro : 0;
    const custoCombustivelCorrida = custoCombustivelPorKm * KmRodados;
    const lucroCurto = valorCorrida - custoCombustivelCorrida;
    setLucroCurtoPrazo(lucroCurto);

    const converterParaAnual = (valor: number, periodicity: Periodicity) => {
      switch(periodicity) {
        case 'monthly': return valor * 12;
        case 'weekly': return valor * 52;
        case 'daily': return valor * 252;
        default: return valor;
      }
    };

    const converterDistanciaParaDiaria = (valor: number, periodicity: Periodicity) => {
      switch(periodicity) {
        case 'monthly': return valor / 21;
        case 'weekly': return valor / 5;
        default: return valor;
      }
    };

    const distanciaDiaria = converterDistanciaParaDiaria(distanciaPercorrida, periodicidadeDistancia);
    
    const custosAnuais = custosManutencao.map(custo => converterParaAnual(custo.valor, custo.periodicity));
    const seguroAnual = converterParaAnual(valorSeguro, periodicidadeSeguro);
    
    const totalManutencaoAnual = custosAnuais.reduce((total, valor) => total + valor, 0);
    
    const premioAnual = converterParaAnual(premioSeguro, 'annual') * 0.1;
    const seguroTotalAnual = seguroAnual + premioAnual;
    
    const denominator = distanciaDiaria * 252;
    const custoManutencaoCorrida = denominator > 0 ? (totalManutencaoAnual + seguroTotalAnual) * KmRodados / denominator : 0;
    const depreciaçãoVeiculo = (denominator > 0 && valorVeiculo > 0) ? (valorVeiculo * 0.0333 * KmRodados) / denominator : 0;
    const lucroLongo = valorCorrida - custoCombustivelCorrida - custoManutencaoCorrida - depreciaçãoVeiculo;
    setLucroLongoPrazo(lucroLongo);
  };

  const adicionarCustoManutencao = () => {
    setCustosManutencao([...custosManutencao, {id: Date.now(), valor: 0, periodicity: 'annual'}]);
  };

  const removerCustoManutencao = (id: number) => {
    if (custosManutencao.length > 1) {
      setCustosManutencao(custosManutencao.filter(custo => custo.id !== id));
    }
  };

  const atualizarCustoManutencao = (id: number, field: string, value: any) => {
    setCustosManutencao(custosManutencao.map(custo => 
      custo.id === id ? {...custo, [field]: value} : custo
    ));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
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
          <option value="zh">中</option>
          <option value="ja">日</option>
          <option value="ar">ع</option>
          <option value="de">DE</option>
          <option value="ru">RU</option>
          <option value="uk">УК</option>
          <option value="da">DK</option>
          <option value="tr">TR</option>
          <option value="sw">SW</option>
        </select>
      </div>

      <img src="./logo.png" alt="Logo" style={{ width: '150px', marginBottom: '10px' }} />
      <div style={{ color: '#fff', fontSize: '24px', marginBottom: '5px' }}>AppLucro.com</div>
      <h1 style={{ color: '#0f0' }}>{t.title}</h1>
      <h2 style={{ color: '#0f0', fontSize: '18px', marginBottom: '20px' }}>{t.subtitle}</h2>
      
      <button onClick={() => setShowModal(!showModal)} style={{
        padding: '10px 20px',
        backgroundColor: '#0f0',
        color: '#000',
        border: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '20px'
      }}>
        {showModal ? t.closeButton : t.registerButton}
      </button>

      {showModal && (
        <div className="modal" style={{ 
          maxWidth: '400px', 
          margin: '0 auto',
          backgroundColor: '#222',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,255,0,0.5)'
        }}>
          <h2 style={{ color: '#0f0' }}>{t.registerButton}</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.fuelPrice}</label>
            <input 
              type="number" 
              value={precoCombustivel} 
              onChange={(e) => setPrecoCombustivel(parseFloat(e.target.value) || 0)} 
              style={{ width: '50%', marginLeft: '10px', padding: '5px' }}
              min="0"
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.fuelEfficiency}</label>
            <input 
              type="number" 
              value={kmPorLitro} 
              onChange={(e) => setKmPorLitro(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
              min="0"
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.insuranceValue}</label>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
              <input 
                type="number" 
                value={valorSeguro} 
                onChange={(e) => setValorSeguro(parseFloat(e.target.value) || 0)} 
                style={{ flex: 1, padding: '5px' }}
                min="0"
              />
              <select
                value={periodicidadeSeguro}
                onChange={(e) => setPeriodicidadeSeguro(e.target.value as Periodicity)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="annual">{t.periodicityOptions.annual}</option>
                <option value="monthly">{t.periodicityOptions.monthly}</option>
                <option value="weekly">{t.periodicityOptions.weekly}</option>
                <option value="daily">{t.periodicityOptions.daily}</option>
             
