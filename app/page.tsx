'use client';

import React, { useState, useEffect } from 'react';

type Periodicity = 'annual' | 'monthly' | 'daily' | 'weekly';
type Cost = {
  id: number;
  valor: number;
  periodicity: Periodicity;
};
type Language = 'pt' | 'en' | 'fr' | 'zh' | 'ja' | 'ar' | 'de' | 'ru' | 'uk' | 'da' | 'tr' | 'sw';

const translations = {
  pt: {
    title: 'Lucros de Corridas (Todas Plataformas/Veículos)',
    subtitle: 'Destinado à tomada de decisões de curto e longo prazo',
    registerButton: 'Cadastrar Dados do Veículo',
    closeButton: 'Fechar Cadastro',
    saveButton: 'Salvar',
    fuelPrice: 'Preço do Combustível por Litro:',
    fuelEfficiency: 'Distância Percorrida por Litro:',
    insuranceValue: 'Valor do Seguro:',
    insurancePremium: 'Prêmio do Seguro:',
    maintenanceCosts: 'Custos de Manutenção:',
    addCost: 'Adicionar Custo',
    remove: 'Remover',
    distance: 'Distância percorrida:',
    workingDays: 'Dias da semana trabalhados:',
    vehicleValue: 'Valor Atual do Veículo:',
    rideValue: 'Valor Pago:',
    rideDistance: 'Distância da Corrida:',
    shortTermProfit: 'Lucro de Curto Prazo:',
    longTermProfit: 'Lucro de Longo Prazo:',
    tips: 'Dicas:',
    tip1: '1. Se você aluga o veículo, deixe o valor do veículo como zero e inclua o valor do aluguel nos custos de manutenção.',
    tip2: '2. Pode ser usado em todas as plataformas e veículos! Para todos os motoristas, tanto aplicativos (Ifood, Uber, 99, etc.) quanto taxi, vans e até ônibus/avião/metrô (demanda criatividade)',
    formula: 'Fórmula do Lucro de Longo Prazo: Receita - Despesas (Combustível e Outros) - Depreciação de 3.33% ao ano sobre o valor do veículo - 10% ao ano sobre o Prêmio do Seguro. Obs.: lucro de curto prazo desconta somente combustível da corrida',
    community: 'Comunidade Open Source! Falar com bernard.bracco no Instagram ou Ehnov7id30 ou Bernard Diniz Bracco no Facebook! Para doações segue o PIX: 100.980.686-60. Custos até então: 4 semanas de mão de obra e 80 reais. Receita até então: 0.',
    periodicityOptions: {
      annual: 'Anual',
      monthly: 'Mensal',
      weekly: 'Semanal',
      daily: 'Diário'
    }
  },
  en: {
    title: 'Ride Profits (All Platforms/Vehicles)',
    subtitle: 'Designed for short and long term decision making',
    registerButton: 'Register Vehicle Data',
    closeButton: 'Close Registration',
    saveButton: 'Save',
    fuelPrice: 'Fuel Price per Liter:',
    fuelEfficiency: 'Distance Traveled per Liter:',
    insuranceValue: 'Insurance Value:',
    insurancePremium: 'Insurance Premium:',
    maintenanceCosts: 'Maintenance Costs:',
    addCost: 'Add Cost',
    remove: 'Remove',
    distance: 'Distance traveled:',
    workingDays: 'Working days per week:',
    vehicleValue: 'Current Vehicle Value:',
    rideValue: 'Paid Value:',
    rideDistance: 'Ride Distance:',
    shortTermProfit: 'Short Term Profit:',
    longTermProfit: 'Long Term Profit:',
    tips: 'Tips:',
    tip1: '1. If you rent the vehicle, set the vehicle value to zero and include the rental value in maintenance costs.',
    tip2: '2. Can be used for all platforms and vehicles! For all drivers, both app-based (Ifood, Uber, 99, etc.) and taxis, vans, and even buses/planes/subways (requires creativity)',
    formula: 'Long Term Profit Formula: Revenue - Expenses (Fuel and Others) - 3.33% per year Vehicle Depreciation - 10% per year Insurance Premium. Note: short term profit only deducts fuel cost from the ride',
    community: 'Open Source Community! Contact bernard.bracco on Instagram or Ehnov7id30 or Bernard Diniz Bracco on Facebook! For donations, PIX: 100.980.686-60. Costs so far: 4 weeks of work and 80 reais. Revenue so far: 0.',
    periodicityOptions: {
      annual: 'Annual',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily'
    }
  },
  fr: {
    title: 'Profits des Courses (Toutes Plateformes/Véhicules)',
    subtitle: 'Conçu pour la prise de décision à court et long terme',
    registerButton: 'Enregistrer les Données du Véhicule',
    closeButton: 'Fermer l\'Enregistrement',
    saveButton: 'Enregistrer',
    fuelPrice: 'Prix du Carburant par Litre:',
    fuelEfficiency: 'Distance Parcourue par Litre:',
    insuranceValue: 'Valeur de l\'Assurance:',
    insurancePremium: 'Prime d\'Assurance:',
    maintenanceCosts: 'Coûts de Maintenance:',
    addCost: 'Ajouter un Coût',
    remove: 'Supprimer',
    distance: 'Distance parcourue:',
    workingDays: 'Jours travaillés par semaine:',
    vehicleValue: 'Valeur Actuelle du Véhicule:',
    rideValue: 'Valeur Payée:',
    rideDistance: 'Distance de Course:',
    shortTermProfit: 'Profit à Court Terme:',
    longTermProfit: 'Profit à Long Terme:',
    tips: 'Conseils:',
    tip1: '1. Si vous louez le véhicule, mettez la valeur du véhicule à zéro et incluez la valeur de la location dans les coûts de maintenance.',
    tip2: '2. Peut être utilisé pour toutes les plateformes et véhicules! Pour tous les conducteurs, applications (Ifood, Uber, 99, etc.), taxis, vans et même bus/avions/métros (nécessite de la créativité)',
    formula: 'Formule du Profit à Long Terme: Revenus - Dépenses (Carburant et Autres) - Dépréciation de 3.33% par an sur la valeur du véhicule - 10% par an sur la Prime d\'Assurance. Remarque: le profit à court terme ne déduit que le coût du carburant de la course',
    community: 'Communauté Open Source! Contactez bernard.bracco sur Instagram ou Ehnov7id30 ou Bernard Diniz Bracco sur Facebook! Pour les dons, PIX: 100.980.686-60. Coûts jusqu\'à présent: 4 semaines de travail et 80 reais. Revenus jusqu\'à présent: 0.',
    periodicityOptions: {
      annual: 'Annuel',
      monthly: 'Mensuel',
      weekly: 'Hebdomadaire',
      daily: 'Quotidien'
    }
  },
  zh: {
    title: '行程利润计算器 (所有平台/车辆)',
    subtitle: '用于短期和长期决策',
    registerButton: '注册车辆数据',
    closeButton: '关闭',
    saveButton: '保存',
    fuelPrice: '燃油价格每升:',
    fuelEfficiency: '每升行驶距离:',
    insuranceValue: '保险价值:',
    insurancePremium: '保险保费:',
    maintenanceCosts: '维护成本:',
    addCost: '添加',
    remove: '删除',
    distance: '行驶距离:',
    workingDays: '每周工作天数:',
    vehicleValue: '车辆现值:',
    rideValue: '行程收入:',
    rideDistance: '行程距离:',
    shortTermProfit: '短期利润:',
    longTermProfit: '长期利润:',
    tips: '提示:',
    tip1: '1. 如租赁车辆，请将车辆价值设为零并将租金计入维护成本',
    tip2: '2. 适用于所有平台和车辆！包括网约车司机(如Ifood, Uber, 99等)、出租车、货车，甚至公交车/飞机/地铁(需灵活应用)',
    formula: '长期利润公式: 收入 - 支出(燃油及其他) - 车辆价值3.33%年折旧 - 保险费用10%年费。注: 短期利润仅扣除行程燃油成本',
    community: '开源社区！Instagram联系@bernard.bracco或Facebook联系Ehnov7id30或Bernard Diniz Bracco！捐赠PIX: 100.980.686-60',
    periodicityOptions: {
      annual: '年',
      monthly: '月',
      weekly: '周',
      daily: '日'
    }
  },
  ja: {
    title: '配達利益計算 (全プラットフォーム/車両)',
    subtitle: '短期・長期の意思決定用',
    registerButton: '車両登録',
    closeButton: '閉じる',
    saveButton: '保存',
    fuelPrice: '燃料価格(1リットル):',
    fuelEfficiency: '1リットル当たり走行距離:',
    insuranceValue: '保険金額:',
    insurancePremium: '保険料:',
    maintenanceCosts: '維持費:',
    addCost: '追加',
    remove: '削除',
    distance: '走行距離:',
    workingDays: '週の稼働日数:',
    vehicleValue: '車両価値:',
    rideValue: '配達収入:',
    rideDistance: '走行距離:',
    shortTermProfit: '短期利益:',
    longTermProfit: '長期利益:',
    tips: 'ヒント:',
    tip1: '1. レンタル車両は車両価値を0にし維持費にレンタル代を計上',
    tip2: '2. 全プラットフォーム/車両で利用可能! 配達アプリ(Ifood, Uber, 99等)、タクシー、バン、バス/飛行機/地下鉄まで(創造力が必要)',
    formula: '長期利益計算式: 収益 - 支出(燃料他) - 車両価値3.33%年間減価 - 保険料10%年間。注: 短期利益は走行の燃料費のみ控除',
    community: 'オープンソース! Instagramでbernard.braccoかFacebookでEhnov7id30かBernard Diniz Braccoに連絡! 寄付PIX:100.980.686-60',
    periodicityOptions: {
      annual: '年',
      monthly: '月',
      weekly: '週',
      daily: '日'
    }
  },
  ar: {
    title: 'حاسبة ربح الرحلات (كل المنصات/المركبات)',
    subtitle: 'لصنع القرارات قصيرة وطويلة المدى',
    registerButton: 'تسجيل بيانات المركبة',
    closeButton: 'إغلاق',
    saveButton: 'حفظ',
    fuelPrice: 'سعر الوقود لكل لتر:',
    fuelEfficiency: 'المسافة المقطوعة لكل لتر:',
    insuranceValue: 'قيمة التأمين:',
    insurancePremium: 'قسط التأمين:',
    maintenanceCosts: 'تكاليف الصيانة:',
    addCost: 'إضافة',
    remove: 'إزالة',
    distance: 'المسافة المقطوعة:',
    workingDays: 'أيام العمل في الأسبوع:',
    vehicleValue: 'قيمة المركبة الحالية:',
    rideValue: 'قيمة الرحلة:',
    rideDistance: 'مسافة الرحلة:',
    shortTermProfit: 'الربح قصير المدى:',
    longTermProfit: 'الربح طويل المدى:',
    tips: 'نصائح:',
    tip1: '1. عند استئجار المركبة، اضبط القيمة على صفر وأضف الإيجار إلى تكاليف الصيانة',
    tip2: '2. يمكن استخدامه لجميع المنصات والمركبات! لكل السائقين، التطبيقات (Ifood, Uber, 99, إلخ)، سيارات الأجرة، الحافلات وحتى الطائرات/المترو (يتطلب الإبداع)',
    formula: 'معادلة الربح طويل المدى: الإيرادات - المصروفات (الوقود وغيرها) - استهلاك 3.33% سنويًا من قيمة المركبة - 10% سنويًا من قسط التأمين. ملاحظة: الربح قصير المدى يخصم فقط تكلفة الوقود للرحلة',
    community: 'مصدر مفتوح! تواصل عبر Instagram bernard.bracco أو Facebook Ehnov7id30 أو Bernard Diniz Bracco! التبرعات: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'سنوي',
      monthly: 'شهري',
      weekly: 'أسبوعي',
      daily: 'يومي'
    }
  },
  de: {
    title: 'Fahrtkostenberechnung (Alle Plattformen/Fahrzeuge)',
    subtitle: 'Für kurzfristige und langfristige Entscheidungen',
    registerButton: 'Fahrzeugdaten registrieren',
    closeButton: 'Schließen',
    saveButton: 'Speichern',
    fuelPrice: 'Kraftstoffpreis pro Liter:',
    fuelEfficiency: 'Strecke pro Liter:',
    insuranceValue: 'Versicherungswert:',
    insurancePremium: 'Versicherungsprämie:',
    maintenanceCosts: 'Wartungskosten:',
    addCost: 'Hinzufügen',
    remove: 'Entfernen',
    distance: 'Fahrstrecke:',
    workingDays: 'Arbeitstage pro Woche:',
    vehicleValue: 'Aktueller Fahrzeugwert:',
    rideValue: 'Fahrtentgelt:',
    rideDistance: 'Fahrstrecke:',
    shortTermProfit: 'Kurzfristiger Gewinn:',
    longTermProfit: 'Langfristiger Gewinn:',
    tips: 'Tipps:',
    tip1: '1. Bei Mietfahrzeugen Wert auf 0 setzen und Miete zu Wartungskosten addieren',
    tip2: '2. Für alle Plattformen und Fahrzeuge nutzbar! Für alle Fahrer, App-basiert (Ifood, Uber, 99 etc.), Taxis, Vans und sogar Busse/Flugzeuge/U-Bahnen (Kreativität erforderlich)',
    formula: 'Langfristige Gewinnformel: Einnahmen - Ausgaben (Kraftstoff und andere) - 3.33% jährliche Fahrzeugwertabschreibung - 10% jährliche Versicherungsprämie. Hinweis: Kurzfristiger Gewinn zieht nur Kraftstoffkosten der Fahrt ab',
    community: 'Open Source! Kontakt: Instagram bernard.bracco oder Facebook Ehnov7id30 oder Bernard Diniz Bracco! Spenden: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Jährlich',
      monthly: 'Monatlich',
      weekly: 'Wöchentlich',
      daily: 'Täglich'
    }
  },
  ru: {
    title: 'Калькулятор прибыли (Все платформы/ТС)',
    subtitle: 'Для краткосрочных и долгосрочных решений',
    registerButton: 'Регистрация данных ТС',
    closeButton: 'Закрыть',
    saveButton: 'Сохранить',
    fuelPrice: 'Цена топлива за литр:',
    fuelEfficiency: 'Расстояние на литр:',
    insuranceValue: 'Страховая стоимость:',
    insurancePremium: 'Страховая премия:',
    maintenanceCosts: 'Затраты на обслуживание:',
    addCost: 'Добавить',
    remove: 'Удалить',
    distance: 'Пробег:',
    workingDays: 'Рабочих дней в неделю:',
    vehicleValue: 'Текущая стоимость ТС:',
    rideValue: 'Доход за поездку:',
    rideDistance: 'Расстояние:',
    shortTermProfit: 'Краткосрочная прибыль:',
    longTermProfit: 'Долгосрочная прибыль:',
    tips: 'Советы:',
    tip1: '1. Для арендованных ТС установите стоимость 0 и включите аренду в затраты',
    tip2: '2. Подходит для всех платформ и ТС! Для всех водителей: приложения (Ifood, Uber, 99 и др.), такси, фургоны и даже автобусы/самолёты/метро (требует креативности)',
    formula: 'Формула долгосрочной прибыли: Доход - Расходы (топливо и др.) - 3.33% годовая амортизация ТС - 10% годовая страховая премия. Прим.: краткосрочная прибыль учитывает только затраты на топливо для поездки',
    community: 'Open Source! Контакты: Instagram bernard.bracco или Facebook Ehnov7id30 или Bernard Diniz Bracco! Пожертвования: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Год',
      monthly: 'Месяц',
      weekly: 'Неделя',
      daily: 'День'
    }
  },
  uk: {
    title: 'Калькулятор прибутку (Усі платформи/ТЗ)',
    subtitle: 'Для прийняття рішень',
    registerButton: 'Реєстрація даних ТЗ',
    closeButton: 'Закрити',
    saveButton: 'Зберегти',
    fuelPrice: 'Ціна палива за літр:',
    fuelEfficiency: 'Відстань на літр:',
    insuranceValue: 'Страхова вартість:',
    insurancePremium: 'Страхова премія:',
    maintenanceCosts: 'Витрати на обслуговування:',
    addCost: 'Додати',
    remove: 'Видалити',
    distance: 'Пробіг:',
    workingDays: 'Робочих днів на тиждень:',
    vehicleValue: 'Поточна вартість ТЗ:',
    rideValue: 'Дохід за поїздку:',
    rideDistance: 'Відстань:',
    shortTermProfit: 'Короткостроковий прибуток:',
    longTermProfit: 'Довгостроковий прибуток:',
    tips: 'Поради:',
    tip1: '1. Для орендованих ТЗ встановіть вартість 0 та додайте оренду до витрат',
    tip2: '2. Підходить для всіх платформ і ТЗ! Для всіх водіїв: додатки (Ifood, Uber, 99 тощо), таксі, фургони та навіть автобуси/літаки/метро (вимагає креативності)',
    formula: 'Формула довгострокового прибутку: Дохід - Витрати (паливо та ін.) - 3.33% річна амортизація ТЗ - 10% річна страхова премія. Прим.: короткостроковий прибуток враховує лише витрати на паливо для поїздки',
    community: 'Open Source! Контакти: Instagram bernard.bracco або Facebook Ehnov7id30 або Bernard Diniz Bracco! Донати: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Рік',
      monthly: 'Місяць',
      weekly: 'Тиждень',
      daily: 'День'
    }
  },
  da: {
    title: 'Kørselsprofitberegner (Alle platforme/køretøjer)',
    subtitle: 'Til kortsigtet og langsigtet beslutningstagning',
    registerButton: 'Registrer køretøjsdata',
    closeButton: 'Luk',
    saveButton: 'Gem',
    fuelPrice: 'Brændstofpris per liter:',
    fuelEfficiency: 'Distance pr. liter:',
    insuranceValue: 'Forsikringsværdi:',
    insurancePremium: 'Forsikringspræmie:',
    maintenanceCosts: 'Vedligeholdelsesomkostninger:',
    addCost: 'Tilføj',
    remove: 'Fjern',
    distance: 'Kørt distance:',
    workingDays: 'Arbejdsdage om ugen:',
    vehicleValue: 'Nuværende køretøjsværdi:',
    rideValue: 'Kørselsindtægt:',
    rideDistance: 'Kørselsdistance:',
    shortTermProfit: 'Kortsigtet profit:',
    longTermProfit: 'Langsigtet profit:',
    tips: 'Tips:',
    tip1: '1. Ved leje af køretøj, sæt værdi til 0 og inkluder leje i omkostninger',
    tip2: '2. Kan bruges til alle platforme og køretøjer! Til alle chauffører, både app-baserede (Ifood, Uber, 99 osv.), taxaer, varevogne og endda busser/fly/tog (kræver kreativitet)',
    formula: 'Langsigtet profitformel: Indtægter - Udgifter (brændstof og andre) - 3.33% årlig køretøjsværdiafsrivning - 10% årlig forsikringspræmie. Bemærk: kortsigtet profit fratrækker kun brændstofomkostninger for kørslen',
    community: 'Open Source! Kontakt: Instagram bernard.bracco eller Facebook Ehnov7id30 eller Bernard Diniz Bracco! Donationer: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Årlig',
      monthly: 'Månedlig',
      weekly: 'Ugentlig',
      daily: 'Daglig'
    }
  },
  tr: {
    title: 'Sürüş Kar Hesaplayıcı (Tüm Platformlar/Araçlar)',
    subtitle: 'Kısa ve uzun vadeli kararlar için',
    registerButton: 'Araç Kaydı',
    closeButton: 'Kapat',
    saveButton: 'Kaydet',
    fuelPrice: 'Yakıt Fiyatı litre başına:',
    fuelEfficiency: 'Litre başına mesafe:',
    insuranceValue: 'Sigorta Değeri:',
    insurancePremium: 'Sigorta Primi:',
    maintenanceCosts: 'Bakım Maliyetleri:',
    addCost: 'Ekle',
    remove: 'Sil',
    distance: 'Mesafe:',
    workingDays: 'Haftalık çalışma günleri:',
    vehicleValue: 'Mevcut Araç Değeri:',
    rideValue: 'Sürüş Geliri:',
    rideDistance: 'Sürüş Mesafesi:',
    shortTermProfit: 'Kısa Vadeli Kar:',
    longTermProfit: 'Uzun Vadeli Kar:',
    tips: 'İpuçları:',
    tip1: '1. Kiralık araçlarda değeri 0 yapın ve kira maliyetlere ekleyin',
    tip2: '2. Tüm platformlar ve araçlar için kullanılabilir! Tüm sürücüler için, uygulama tabanlı (Ifood, Uber, 99 vb.), taksiler, minibüsler ve hatta otobüsler/uçaklar/metrolar (yaratıcılık gerektirir)',
    formula: 'Uzun Vadeli Kar Formülü: Gelir - Giderler (Yakıt ve Diğer) - Aracın değerinin %3.33 yıllık amortismanı - Sigorta Primi %10 yıllık. Not: kısa vadeli kar yalnızca sürüş yakıt maliyetini düşürür',
    community: 'Açık Kaynak! İletişim: Instagram bernard.bracco veya Facebook Ehnov7id30 veya Bernard Diniz Bracco! Bağışlar: PIX: 100.980.686-60',
    periodicityOptions: {
      annual: 'Yıllık',
      monthly: 'Aylık',
      weekly: 'Haftalık',
      daily: 'Günlük'
    }
  },
  sw: {
    title: 'Kikokotoo cha Faida ya Usafiri (Mifumo Yote/Magari)',
    subtitle: 'Kwa maamuzi ya muda mfupi na mrefu',
    registerButton: 'Sajili Data ya Gari',
    closeButton: 'Funga',
    saveButton: 'Hifadhi',
    fuelPrice: 'Bei ya Mafuta kwa lita:',
    fuelEfficiency: 'Umbali kwa lita:',
    insuranceValue: 'Thamani ya Bima:',
    insurancePremium: 'Malipo ya Bima:',
    maintenanceCosts: 'Gharama za Ukarabati:',
    addCost: 'Ongeza',
    remove: 'Ondoa',
    distance: 'Umbali:',
    workingDays: 'Siku za kufanya kazi kwa wiki:',
    vehicleValue: 'Thamani ya Sasa ya Gari:',
    rideValue: 'Mapato ya Safari:',
    rideDistance: 'Umbali wa Safari:',
    shortTermProfit: 'Faida ya Muda Mfupi:',
    longTermProfit: 'Faida ya Muda Mrefu:',
    tips: 'Vidokezo:',
    tip1: '1. Kwa gari zilizokodishwa, weka thamani ya 0 na ongeza kodi kwenye gharama',
    tip2: '2. Inaweza kutumika kwa mifumo yote na magari! Kwa madereva wote, programu (Ifood, Uber, 99, n.k.), teksi, vani na hata mabasi/ndege/metro (inahitaji ubunifu)',
    formula: 'Fomula ya Faida ya Muda Mrefu: Mapato - Matumizi (Mafuta na mengine) - 3.33% kupungua kwa thamani ya gari kwa mwaka - 10% ya Malipo ya Bima kwa mwaka. Kumbuka: faida ya muda mfupi inatoa tu gharama ya mafuta ya safari',
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
  const [precoCombustivel, setPrecoCombustivel] = useState<string>('5');
  const [kmPorLitro, setKmPorLitro] = useState<string>('35');
  const [valorSeguro, setValorSeguro] = useState<string>('2000');
  const [periodicidadeSeguro, setPeriodicidadeSeguro] = useState<Periodicity>('annual');
  const [premioSeguro, setPremioSeguro] = useState<string>('4000');
  const [custosManutencao, setCustosManutencao] = useState<Cost[]>([{id: 1, valor: 20000, periodicity: 'annual'}]);
  const [distanciaPercorrida, setDistanciaPercorrida] = useState<string>('250');
  const [periodicidadeDistancia, setPeriodicidadeDistancia] = useState<Periodicity>('daily');
  const [diasTrabalhadosPorSemana, setDiasTrabalhadosPorSemana] = useState<string>('5');
  const [valorVeiculo, setValorVeiculo] = useState<string>('15000');
  const [valorCorrida, setValorCorrida] = useState<string>('15');
  const [KmRodados, setKmRodados] = useState<string>('10');
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState<number | null>(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('pt');

  const t = translations[language];

  const formatNumberInput = (value: string): string => {
    return value.replace(/[^0-9.,]/g, '')
                .replace(',', '.')
                .replace(/(\..*)\./g, '$1');
  };

  const parseInput = (value: string): number => {
    const formattedValue = formatNumberInput(value);
    if (formattedValue === '' || isNaN(parseFloat(formattedValue))) return 0;
    return parseFloat(formattedValue);
  };

  const handleNumberInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const formattedValue = formatNumberInput(value);
    setter(formattedValue);
  };

  useEffect(() => {
    calcularLucros();
  }, [precoCombustivel, kmPorLitro, valorSeguro, periodicidadeSeguro, premioSeguro, 
      custosManutencao, distanciaPercorrida, periodicidadeDistancia, 
      diasTrabalhadosPorSemana, valorVeiculo, valorCorrida, KmRodados]);

  const calcularLucros = () => {
    const custoCombustivelPorKm = parseInput(kmPorLitro) > 0 ? parseInput(precoCombustivel) / parseInput(kmPorLitro) : 0;
    const custoCombustivelCorrida = custoCombustivelPorKm * parseInput(KmRodados);
    const lucroCurto = parseInput(valorCorrida) - custoCombustivelCorrida;
    setLucroCurtoPrazo(lucroCurto);

    const converterParaAnual = (valor: number, periodicity: Periodicity) => {
      const fatorDias = periodicidadeDistancia === 'daily' ? parseInput(diasTrabalhadosPorSemana)/5 : 1;
      switch(periodicity) {
        case 'monthly': return valor * 12;
        case 'weekly': return valor * 52;
        case 'daily': return valor * 252 * fatorDias;
        default: return valor;
      }
    };

    const converterDistanciaParaDiaria = (valor: number, periodicity: Periodicity) => {
      switch(periodicity) {
        case 'monthly': return valor / 21;
        case 'weekly': return valor / parseInput(diasTrabalhadosPorSemana);
        case 'daily': return valor;
        default: return valor;
      }
    };

    const distanciaDiaria = converterDistanciaParaDiaria(parseInput(distanciaPercorrida), periodicidadeDistancia);
    const diasUteisAno = 252 * (periodicidadeDistancia === 'daily' ? parseInput(diasTrabalhadosPorSemana)/5 : 1);
    const denominator = distanciaDiaria * diasUteisAno;

    const custosAnuais = custosManutencao.map(custo => converterParaAnual(custo.valor, custo.periodicity));
    const seguroAnual = converterParaAnual(parseInput(valorSeguro), periodicidadeSeguro);
    
    const descontoPremioAnual = parseInput(premioSeguro) * 0.1;
    
    const custoManutencaoCorrida = denominator > 0 ? 
      custosAnuais.reduce((total, valor) => total + valor, 0) * parseInput(KmRodados) / denominator : 0;
    
    const custoSeguroCorrida = denominator > 0 ? seguroAnual * parseInput(KmRodados) / denominator : 0;
    
    const depreciaçãoVeiculo = (denominator > 0 && parseInput(valorVeiculo) > 0) ? 
      (parseInput(valorVeiculo) * 0.0333 * parseInput(KmRodados)) / denominator : 0;
    
    const descontoPremioCorrida = denominator > 0 ? 
      descontoPremioAnual * parseInput(KmRodados) / denominator : 0;

    const lucroLongo = parseInput(valorCorrida) - custoCombustivelCorrida - custoManutencaoCorrida - 
                      custoSeguroCorrida - depreciaçãoVeiculo - descontoPremioCorrida;
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
    if (field === 'valor') {
      value = formatNumberInput(value.toString());
      value = value === '' ? '0' : value;
    }
    setCustosManutencao(custosManutencao.map(custo => 
      custo.id === id ? {...custo, [field]: field === 'valor' ? parseFloat(value) : value} : custo
    ));
  };

  const handleDiasTrabalhadosChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 7)) {
      setDiasTrabalhadosPorSemana(numericValue);
    }
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
        <div style={{ 
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
              type="text" 
              value={precoCombustivel} 
              onChange={(e) => handleNumberInput(e.target.value, setPrecoCombustivel)} 
              style={{ width: '50%', marginLeft: '10px', padding: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.fuelEfficiency}</label>
            <input 
              type="text" 
              value={kmPorLitro} 
              onChange={(e) => handleNumberInput(e.target.value, setKmPorLitro)} 
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.insuranceValue}</label>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
              <input 
                type="text" 
                value={valorSeguro} 
                onChange={(e) => handleNumberInput(e.target.value, setValorSeguro)} 
                style={{ flex: 1, padding: '5px' }}
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
              </select>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.insurancePremium}</label>
            <input 
              type="text" 
              value={premioSeguro} 
              onChange={(e) => handleNumberInput(e.target.value, setPremioSeguro)} 
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.maintenanceCosts}</label>
            {custosManutencao.map((custo) => (
              <div key={custo.id} style={{marginBottom: '10px'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                  <input 
                    type="text" 
                    value={custo.valor} 
                    onChange={(e) => atualizarCustoManutencao(custo.id, 'valor', e.target.value)} 
                    style={{ flex: 1, padding: '5px' }}
                  />
                  <select
                    value={custo.periodicity}
                    onChange={(e) => atualizarCustoManutencao(custo.id, 'periodicity', e.target.value)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  >
                    <option value="annual">{t.periodicityOptions.annual}</option>
                    <option value="monthly">{t.periodicityOptions.monthly}</option>
                    <option value="weekly">{t.periodicityOptions.weekly}</option>
                    <option value="daily">{t.periodicityOptions.daily}</option>
                  </select>
                  {custosManutencao.length > 1 && (
                    <button 
                      onClick={() => removerCustoManutencao(custo.id)} 
                      style={{
                        marginLeft: '10px', 
                        padding: '5px 10px',
                        backgroundColor: '#f00',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      {t.remove}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button 
              onClick={adicionarCustoManutencao}
              style={{ 
                marginTop: '5px', 
                padding: '5px 10px',
                backgroundColor: '#0f0',
                color: '#000',
                border: 'none',
                borderRadius: '3px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {t.addCost}
            </button>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.distance}</label>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
              <input 
                type="text" 
                value={distanciaPercorrida} 
                onChange={(e) => handleNumberInput(e.target.value, setDistanciaPercorrida)} 
                style={{ flex: 1, padding: '5px' }}
              />
              <select
                value={periodicidadeDistancia}
                onChange={(e) => setPeriodicidadeDistancia(e.target.value as Periodicity)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="daily">{t.periodicityOptions.daily}</option>
                <option value="weekly">{t.periodicityOptions.weekly}</option>
                <option value="monthly">{t.periodicityOptions.monthly}</option>
              </select>
            </div>
          </div>

          {periodicidadeDistancia === 'daily' && (
            <div style={{ marginBottom: '15px' }}>
              <label>{t.workingDays}</label>
              <input 
                type="text" 
                value={diasTrabalhadosPorSemana} 
                onChange={(e) => handleDiasTrabalhadosChange(e.target.value)} 
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </div>
          )}
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.vehicleValue}</label>
            <input 
              type="text" 
              value={valorVeiculo} 
              onChange={(e) => handleNumberInput(e.target.value, setValorVeiculo)} 
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>
          
          <button 
            onClick={() => setShowModal(false)} 
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              fontSize: '16px',
              backgroundColor: '#0f0',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {t.saveButton}
          </button>
        </div>
      )}

      <div style={{ margin: '15px 0' }}>
        <label>{t.rideValue}</label>
        <input 
          type="text" 
          value={valorCorrida} 
          onChange={(e) => handleNumberInput(e.target.value, setValorCorrida)} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <label>{t.rideDistance}</label>
        <input 
          type="text" 
          value={KmRodados} 
          onChange={(e) => handleNumberInput(e.target.value, setKmRodados)} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <div style={{ margin: '15px 0' }}>
        <label>{t.shortTermProfit}</label>
        <input 
          type="text" 
          value={lucroCurtoPrazo !== null ? `$${lucroCurtoPrazo.toFixed(2)}` : ''} 
          readOnly 
          style={{ 
            backgroundColor: '#0f0',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            padding: '8px',
            borderRadius: '5px',
            marginLeft: '10px',
            width: '150px',
            textAlign: 'center'
          }}
        />
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <label>{t.longTermProfit}</label>
        <input 
          type="text" 
          value={lucroLongoPrazo !== null ? `$${lucroLongoPrazo.toFixed(2)}` : ''} 
          readOnly 
          style={{ 
            backgroundColor: '#0f0',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            padding: '8px',
            borderRadius: '5px',
            marginLeft: '10px',
            width: '150px',
            textAlign: 'center'
          }}
        />
      </div>

      <p style={{ maxWidth: '800px', margin: '20px auto', lineHeight: '1.5' }}>
        <strong style={{ color: '#0f0' }}>{t.tips}</strong><br />
        #{t.tip1}<br />
        #{t.tip2}<br /><br />
        #{t.formula}
      </p>
    </div>
  );
}
