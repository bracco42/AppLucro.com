'use client';

import React, { useState, useEffect } from 'react';

type Periodicity = 'annual' | 'monthly' | 'daily' | 'weekly';
type Cost = {
  id: number;
  valor: number;
  periodicity: Periodicity;
};
type Language = 'pt' | 'en' | 'fr' | 'zh' | 'ja' | 'ar' | 'de' | 'ru' | 'uk' | 'da' | 'tr' | 'sw' | 'hi' | 'es' | 'it' | 'pa' | 'vi' | 'ko' | 'th' | 'fa';

const translations = {
  'pt': {
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
    tip1: 'Se você aluga o veículo, deixe o valor do veículo como zero e inclua o valor do aluguel nos custos de manutenção.',
    tip2: 'Pode ser usado em todas as plataformas e veículos! Para todos os motoristas, tanto aplicativos (Ifood, Uber, 99, etc.) quanto taxi, vans e até ônibus/avião/metrô (demanda criatividade)',
    formula: 'Fórmula do Lucro de Longo Prazo: Receita - Despesas (Combustível e Outros) - Depreciação (3.33% * Valor do Veículo por ano) - Risco (10% * Prêmio do Seguro por ano). Obs.: lucro de curto prazo desconta somente combustível da corrida',
    community: 'Entre em nossa <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Comunidade OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Anual',
      monthly: 'Mensal',
      weekly: 'Semanal',
      daily: 'Diário'
    }
  },
  'en': {
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
    tip1: 'If you rent the vehicle, set the vehicle value to zero and include the rental value in maintenance costs.',
    tip2: 'Can be used for all platforms and vehicles! For all drivers, both app-based (Ifood, Uber, 99, etc.) and taxis, vans, and even buses/planes/subways (requires creativity)',
    formula: 'Long Term Profit Formula: Revenue - Expenses (Fuel and Others) - Depreciation (3.33% * Vehicle Value per year) - Risk (10% * Insurance Premium per year). Note: short term profit only deducts fuel cost from the ride',
    community: 'Join our <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">OpenSource Community</a>!!!',
    periodicityOptions: {
      annual: 'Annual',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily'
    }
  },
  'fr': {
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
    tip1: 'Si vous louez le véhicule, mettez la valeur du véhicule à zéro et incluez la valeur de la location dans les coûts de maintenance.',
    tip2: 'Peut être utilisé pour toutes les plateformes et véhicules! Pour tous les conducteurs, applications (Ifood, Uber, 99, etc.), taxis, vans et même bus/avions/métros (nécessite de la créativité)',
    formula: 'Formule du Profit à Long Terme: Revenus - Dépenses (Carburant et Autres) - Dépréciation (3.33% * Valeur du Véhicule par an) - Risque (10% * Prime d\'Assurance par an). Remarque: le profit à court terme ne déduit que le coût du carburant de la course',
    community: 'Rejoignez notre <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Communauté OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Annuel',
      monthly: 'Mensuel',
      weekly: 'Hebdomadaire',
      daily: 'Quotidien'
    }
  },
  'zh': {
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
    tip1: '如租赁车辆，请将车辆价值设为零并将租金计入维护成本',
    tip2: '适用于所有平台和车辆！包括网约车司机(如Ifood, Uber, 99等)、出租车、货车，甚至公交车/飞机/地铁(需灵活应用)',
    formula: '长期利润公式: 收入 - 支出(燃油及其他) - 折旧 (3.33% * 车辆价值每年) - 风险 (10% * 保险费用每年)。注: 短期利润仅扣除行程燃油成本',
    community: '加入我们的<a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">开源社区</a>!!!',
    periodicityOptions: {
      annual: '年',
      monthly: '月',
      weekly: '周',
      daily: '日'
    }
  },
  'ja': {
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
    tip1: 'レンタル車両は車両価値を0にし維持費にレンタル代を計上',
    tip2: '全プラットフォーム/車両で利用可能! 配達アプリ(Ifood, Uber, 99等)、タクシー、バン、バス/飛行機/地下鉄まで(創造力が必要)',
    formula: '長期利益計算式: 収益 - 支出(燃料他) - 減価 (3.33% * 車両価値 年間) - リスク (10% * 保険料 年間)。注: 短期利益は走行の燃料費のみ控除',
    community: '私たちの<a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">オープンソースコミュニティ</a>に参加しましょう',
    periodicityOptions: {
      annual: '年',
      monthly: '月',
      weekly: '週',
      daily: '日'
    }
  },
  'ar': {
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
    tip1: 'عند استئجار المركبة، اضبط القيمة على صفر وأضف الإيجار إلى تكاليف الصيانة',
    tip2: 'يمكن استخدامه لجميع المنصات والمركبات! لكل السائقين، التطبيقات (Ifood, Uber, 99, إلخ)، سيارات الأجرة، الحافلات وحتى الطائرات/المترو (يتطلب الإبداع)',
    formula: 'معادلة الربح طويل المدى: الإيرادات - المصروفات (الوقود وغيرها) - الإهلاك (3.33% * قيمة المركبة سنوياً) - المخاطرة (10% * قسط التأمين سنوياً). ملاحظة: الربح قصير المدى يخصم فقط تكلفة الوقود للرحلة',
    community: 'انضم إلى <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">مجتمعنا المفتوح المصدر</a>!!!',
    periodicityOptions: {
      annual: 'سنوي',
      monthly: 'شهري',
      weekly: 'أسبوعي',
      daily: 'يومي'
    }
  },
  'de': {
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
    tip1: 'Bei Mietfahrzeugen Wert auf 0 setzen und Miete zu Wartungskosten addieren',
    tip2: 'Für alle Plattformen und Fahrzeuge nutzbar! Für alle Fahrer, App-basiert (Ifood, Uber, 99 etc.), Taxis, Vans und sogar Busse/Flugzeuge/U-Bahnen (Kreativität erforderlich)',
    formula: 'Langfristige Gewinnformel: Einnahmen - Ausgaben (Kraftstoff und andere) - Abschreibung (3.33% * Fahrzeugwert pro Jahr) - Risiko (10% * Versicherungsprämie pro Jahr). Hinweis: Kurzfristiger Gewinn zieht nur Kraftstoffkosten der Fahrt ab',
    community: 'Treten Sie unserer <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">OpenSource-Community</a> bei',
    periodicityOptions: {
      annual: 'Jährlich',
      monthly: 'Monatlich',
      weekly: 'Wöchentlich',
      daily: 'Täglich'
    }
  },
  'ru': {
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
    tip1: 'Для арендованных ТС установите стоимость 0 и включите аренду в затраты',
    tip2: 'Подходит для всех платформ и ТС! Для всех водителей: приложения (Ifood, Uber, 99 и др.), такси, фургоны и даже автобусы/самолёты/метро (требует креативности)',
    formula: 'Формула долгосрочной прибыли: Доход - Расходы (топливо и др.) - Амортизация (3.33% * Стоимость ТС в год) - Риск (10% * Страховая премия в год). Прим.: краткосрочная прибыль учитывает только затраты на топливо для поездки',
    community: 'Присоединяйтесь к нашему <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">сообществу OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Год',
      monthly: 'Месяц',
      weekly: 'Неделя',
      daily: 'День'
    }
  },
  'uk': {
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
    tip1: 'Для орендованих ТЗ встановіть вартість 0 та додайте оренду до витрат',
    tip2: 'Підходить для всіх платформ і ТЗ! Для всіх водіїв: додатки (Ifood, Uber, 99 тощо), таксі, фургони та навіть автобуси/літаки/метро (вимагає креативності)',
    formula: 'Формула довгострокового прибутку: Дохід - Витрати (паливо та ін.) - Амортизація (3.33% * Вартість ТЗ на рік) - Ризик (10% * Страхова премія на рік). Прим.: короткостроковий прибуток враховує лише витрати на паливо для поїздки',
    community: 'Приєднуйтесь до нашої <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">спільноти OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Рік',
      monthly: 'Місяць',
      weekly: 'Тиждень',
      daily: 'День'
    }
  },
  'da': {
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
    tip1: 'Ved leje af køretøj, sæt værdi til 0 og inkluder leje i omkostninger',
    tip2: 'Kan bruges til alle platforme og køretøjer! Til alle chauffører, både app-baserede (Ifood, Uber, 99 osv.), taxaer, varevogne og endda busser/fly/tog (kræver kreativitet)',
    formula: 'Langsigtet profitformel: Indtægter - Udgifter (brændstof og andre) - Afskrivning (3.33% * Køretøjsværdi pr. år) - Risiko (10% * Forsikringspræmie pr. år). Bemærk: kortsigtet profit fratrækker kun brændstofomkostninger for kørslen',
    community: 'Tilmeld dig vores <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">OpenSource-fællesskab</a>!!!',
    periodicityOptions: {
      annual: 'Årlig',
      monthly: 'Månedlig',
      weekly: 'Ugentlig',
      daily: 'Daglig'
    }
  },
  'tr': {
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
    tip1: 'Kiralık araçlarda değeri 0 yapın ve kira maliyetlere ekleyin',
    tip2: 'Tüm platformlar ve araçlar için kullanılabilir! Tüm sürücüler için, uygulama tabanlı (Ifood, Uber, 99 vb.), taksiler, minibüsler ve hatta otobüsler/uçaklar/metrolar (yaratıcılık gerektirir)',
    formula: 'Uzun Vadeli Kar Formülü: Gelir - Giderler (Yakıt ve Diğer) - Amortisman (3.33% * Araç Değeri yıllık) - Risk (10% * Sigorta Primi yıllık). Not: kısa vadeli kar yalnızca sürüş yakıt maliyetini düşürür',
    community: '<a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Açık Kaynak Topluluğumuza</a> katılın',
    periodicityOptions: {
      annual: 'Yıllık',
      monthly: 'Aylık',
      weekly: 'Haftalık',
      daily: 'Günlük'
    }
  },
  'sw': {
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
    tip1: 'Kwa gari zilizokodishwa, weka thamani ya 0 na ongeza kodi kwenye gharama',
    tip2: 'Inaweza kutumika kwa mifumo yote na magari! Kwa madereva wote, programu (Ifood, Uber, 99, n.k.), teksi, vani na hata mabasi/ndege/metro (inahitaji ubunifu)',
    formula: 'Fomula ya Faida ya Muda Mrefu: Mapato - Matumizi (Mafuta na mengine) - Mshuko wa Thamani (3.33% * Thamani ya Gari kwa mwaka) - Hatari (10% * Malipo ya Bima kwa mwaka). Kumbuka: faida ya muda mfupi inatoa tu gharama ya mafuta ya safari',
    community: 'Jiunge na <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Jumuiya yetu ya OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Mwaka',
      monthly: 'Mwezi',
      weekly: 'Wiki',
      daily: 'Siku'
    }
  },
  'hi': {
    title: 'सवारी लाभ कैलकुलेटर (सभी प्लेटफॉर्म/वाहन)',
    subtitle: 'लघु और दीर्घकालिक निर्णय लेने के लिए',
    registerButton: 'वाहन डेटा पंजीकृत करें',
    closeButton: 'बंद करें',
    saveButton: 'सहेजें',
    fuelPrice: 'प्रति लीटर ईंधन की कीमत:',
    fuelEfficiency: 'प्रति लीटर तय की गई दूरी:',
    insuranceValue: 'बीमा मूल्य:',
    insurancePremium: 'बीमा प्रीमियम:',
    maintenanceCosts: 'रखरखाव लागत:',
    addCost: 'जोड़ें',
    remove: 'हटाएं',
    distance: 'तय की गई दूरी:',
    workingDays: 'प्रति सप्ताह कार्य दिवस:',
    vehicleValue: 'वाहन का वर्तमान मूल्य:',
    rideValue: 'भुगतान मूल्य:',
    rideDistance: 'सवारी दूरी:',
    shortTermProfit: 'अल्पकालिक लाभ:',
    longTermProfit: 'दीर्घकालिक लाभ:',
    tips: 'सुझाव:',
    tip1: 'यदि आप वाहन किराए पर लेते हैं, तो वाहन का मूल्य शून्य पर सेट करें और किराए को रखरखाव लागत में शामिल करें',
    tip2: 'सभी प्लेटफॉर्म और वाहनों के लिए उपयोग किया जा सकता है! सभी ड्राइवरों के लिए, ऐप-आधारित (Ifood, Uber, 99 आदि), टैक्सी, वैन और यहां तक कि बसें/विमान/मेट्रो (रचनात्मकता की आवश्यकता है)',
    formula: 'दीर्घकालिक लाभ सूत्र: राजस्व - व्यय (ईंधन और अन्य) - मूल्यह्रास (3.33% * वाहन मूल्य प्रति वर्ष) - जोखिम (10% * बीमा प्रीमियम प्रति वर्ष)। नोट: अल्पकालिक लाभ केवल सवारी के ईंधन लागत को घटाता है',
    community: 'हमारे <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">ओपनसोर्स समुदाय</a> में शामिल हों',
    periodicityOptions: {
      annual: 'वार्षिक',
      monthly: 'मासिक',
      weekly: 'साप्ताहिक',
      daily: 'दैनिक'
    }
  },
  'es': {
    title: 'Calculadora de Beneficios de Viajes (Todas Plataformas/Vehículos)',
    subtitle: 'Diseñado para toma de decisiones a corto y largo plazo',
    registerButton: 'Registrar Datos del Vehículo',
    closeButton: 'Cerrar Registro',
    saveButton: 'Guardar',
    fuelPrice: 'Precio del Combustible por Litro:',
    fuelEfficiency: 'Distancia Recorrida por Litro:',
    insuranceValue: 'Valor del Seguro:',
    insurancePremium: 'Prima del Seguro:',
    maintenanceCosts: 'Costos de Mantenimiento:',
    addCost: 'Agregar Costo',
    remove: 'Eliminar',
    distance: 'Distancia recorrida:',
    workingDays: 'Días laborales por semana:',
    vehicleValue: 'Valor Actual del Vehículo:',
    rideValue: 'Valor Pagado:',
    rideDistance: 'Distancia del Viaje:',
    shortTermProfit: 'Beneficio a Corto Plazo:',
    longTermProfit: 'Beneficio a Largo Plazo:',
    tips: 'Consejos:',
    tip1: 'Si alquilas el vehículo, establece el valor del vehículo en cero e incluye el valor del alquiler en los costos de mantenimiento',
    tip2: '¡Puede usarse para todas las plataformas y vehículos! Para todos los conductores, tanto aplicaciones (Ifood, Uber, 99, etc.) como taxis, furgonetas e incluso autobuses/aviones/metro (requiere creatividad)',
    formula: 'Fórmula de Beneficio a Largo Plazo: Ingresos - Gastos (Combustible y Otros) - Depreciación (3.33% * Valor del Vehículo por año) - Riesgo (10% * Prima del Seguro por año). Nota: el beneficio a corto plazo solo descuenta el costo de combustible del viaje',
    community: 'Únete a nuestra <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Comunidad OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Anual',
      monthly: 'Mensual',
      weekly: 'Semanal',
      daily: 'Diario'
    }
  },
  'it': {
    title: 'Calcolatore Profitti Corse (Tutte Piattaforme/Veicoli)',
    subtitle: 'Per decisioni a breve e lungo termine',
    registerButton: 'Registra Dati Veicolo',
    closeButton: 'Chiudi Registrazione',
    saveButton: 'Salva',
    fuelPrice: 'Prezzo Carburante al Litro:',
    fuelEfficiency: 'Distanza per Litro:',
    insuranceValue: 'Valore Assicurazione:',
    insurancePremium: 'Premio Assicurativo:',
    maintenanceCosts: 'Costi Manutenzione:',
    addCost: 'Aggiungi Costo',
    remove: 'Rimuovi',
    distance: 'Distanza percorsa:',
    workingDays: 'Giorni lavorativi a settimana:',
    vehicleValue: 'Valore Attuale Veicolo:',
    rideValue: 'Valore Pagato:',
    rideDistance: 'Distanza Corsa:',
    shortTermProfit: 'Profitto Breve Termine:',
    longTermProfit: 'Profitto Lungo Termine:',
    tips: 'Consigli:',
    tip1: 'Se noleggi il veicolo, imposta il valore a zero e includi il noleggio nei costi di manutenzione',
    tip2: 'Utilizzabile per tutte le piattaforme e veicoli! Per tutti i conducenti, app (Ifood, Uber, 99, etc.), taxi, furgoni e persino bus/aerei/metro (richiede creatività)',
    formula: 'Formula Profitto Lungo Termine: Ricavi - Spese (Carburante e Altri) - Deprezzamento (3.33% * Valore Veicolo all\'anno) - Rischio (10% * Premio Assicurativo all\'anno). Nota: il profitto a breve termine detrae solo il costo del carburante della corsa',
    community: 'Unisciti alla nostra <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Comunità OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Annuale',
      monthly: 'Mensile',
      weekly: 'Settimanale',
      daily: 'Giornaliero'
    }
  },
  'pa': {
    title: 'ਸਵਾਰੀ ਲਾਭ ਕੈਲਕੁਲੇਟਰ (ਸਾਰੇ ਪਲੇਟਫਾਰਮ/ਵਾਹਨ)',
    subtitle: 'ਛੋਟੇ ਅਤੇ ਲੰਬੇ ਸਮੇਂ ਦੇ ਫੈਸਲਿਆਂ ਲਈ',
    registerButton: 'ਵਾਹਨ ਡੇਟਾ ਰਜਿਸਟਰ ਕਰੋ',
    closeButton: 'ਬੰਦ ਕਰੋ',
    saveButton: 'ਸੇਵ ਕਰੋ',
    fuelPrice: 'ਪ੍ਰਤੀ ਲੀਟਰ ਈਂਧਨ ਦੀ ਕੀਮਤ:',
    fuelEfficiency: 'ਪ੍ਰਤੀ ਲੀਟਰ ਦੂਰੀ:',
    insuranceValue: 'ਬੀਮਾ ਮੁੱਲ:',
    insurancePremium: 'ਬੀਮਾ ਪ੍ਰੀਮੀਅਮ:',
    maintenanceCosts: 'ਰੱਖ-ਰਖਾਅ ਲਾਗਤ:',
    addCost: 'ਜੋੜੋ',
    remove: 'ਹਟਾਓ',
    distance: 'ਤੈਅ ਦੂਰੀ:',
    workingDays: 'ਹਫ਼ਤੇ ਦੇ ਕੰਮ ਦੇ ਦਿਨ:',
    vehicleValue: 'ਵਾਹਨ ਦਾ ਮੌਜੂਦਾ ਮੁੱਲ:',
    rideValue: 'ਭੁਗਤਾਨ ਕੀਤਾ ਮੁੱਲ:',
    rideDistance: 'ਸਵਾਰੀ ਦੂਰੀ:',
    shortTermProfit: 'ਛੋਟੇ ਸਮੇਂ ਦਾ ਲਾਭ:',
    longTermProfit: 'ਲੰਬੇ ਸਮੇਂ ਦਾ ਲਾਭ:',
    tips: 'ਸੁਝਾਅ:',
    tip1: 'ਜੇਕਰ ਤੁਸੀਂ ਵਾਹਨ ਕਿਰਾਏ \'ਤੇ ਲੈਂਦੇ ਹੋ, ਤਾਂ ਵਾਹਨ ਦਾ ਮੁੱਲ ਜ਼ੀਰੋ \'ਤੇ ਸੈੱਟ ਕਰੋ ਅਤੇ ਕਿਰਾਏ ਨੂੰ ਰੱਖ-ਰਖਾਅ ਲਾਗਤ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ',
    tip2: 'ਸਾਰੇ ਪਲੇਟਫਾਰਮ ਅਤੇ ਵਾਹਨਾਂ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ! ਸਾਰੇ ਡਰਾਈਵਰਾਂ ਲਈ, ਐਪ-ਅਧਾਰਿਤ (Ifood, Uber, 99 ਆਦਿ), ਟੈਕਸੀ, ਵੈਨ ਅਤੇ ਯਹਾਂ ਤੱਕ ਕਿ ਬੱਸਾਂ/ਜਹਾਜ਼/ਮੈਟਰੋ (ਰਚਨਾਤਮਕਤਾ ਦੀ ਲੋੜ ਹੈ)',
    formula: 'ਲੰਬੇ ਸਮੇਂ ਦੇ ਲਾਭ ਦਾ ਫਾਰਮੂਲਾ: ਆਮਦਨ - ਖਰਚ (ਈਂਧਨ ਅਤੇ ਹੋਰ) - ਮੁੱਲ ਘਟਾਓ (3.33% * ਵਾਹਨ ਮੁੱਲ ਪ੍ਰਤੀ ਸਾਲ) - ਜੋਖਮ (10% * ਬੀਮਾ ਪ੍ਰੀਮੀਅਮ ਪ੍ਰਤੀ ਸਾਲ)। ਨੋਟ: ਛੋਟੇ ਸਮੇਂ ਦਾ ਲਾਭ ਸਿਰਫ਼ ਸਵਾਰੀ ਦੀ ਈਂਧਨ ਲਾਗਤ ਨੂੰ ਘਟਾਉਂਦਾ ਹੈ',
    community: 'ਸਾਡੇ <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">ਓਪਨਸੋਰਸ ਕਮਿਊਨਿਟੀ</a> ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
    periodicityOptions: {
      annual: 'ਸਾਲਾਨਾ',
      monthly: 'ਮਹੀਨਾਵਾਰ',
      weekly: 'ਹਫ਼ਤਾਵਾਰ',
      daily: 'ਰੋਜ਼ਾਨਾ'
    }
  },
  'vi': {
    title: 'Máy Tính Lợi Nhuận Chuyến Đi (Tất Cả Nền Tảng/Xe)',
    subtitle: 'Dành cho quyết định ngắn hạn và dài hạn',
    registerButton: 'Đăng Ký Dữ Liệu Xe',
    closeButton: 'Đóng Đăng Ký',
    saveButton: 'Lưu',
    fuelPrice: 'Giá Nhiên Liệu Mỗi Lít:',
    fuelEfficiency: 'Khoảng Cách Đi Được Mỗi Lít:',
    insuranceValue: 'Giá Trị Bảo Hiểm:',
    insurancePremium: 'Phí Bảo Hiểm:',
    maintenanceCosts: 'Chi Phí Bảo Trì:',
    addCost: 'Thêm Chi Phí',
    remove: 'Xóa',
    distance: 'Khoảng cách đã đi:',
    workingDays: 'Ngày làm việc mỗi tuần:',
    vehicleValue: 'Giá Trị Hiện Tại Của Xe:',
    rideValue: 'Giá Trị Thanh Toán:',
    rideDistance: 'Khoảng Cách Chuyến Đi:',
    shortTermProfit: 'Lợi Nhuận Ngắn Hạn:',
    longTermProfit: 'Lợi Nhuận Dài Hạn:',
    tips: 'Mẹo:',
    tip1: 'Nếu bạn thuê xe, đặt giá trị xe bằng 0 và bao gồm giá thuê trong chi phí bảo trì',
    tip2: 'Có thể sử dụng cho tất cả nền tảng và xe! Cho tất cả tài xế, ứng dụng (Ifood, Uber, 99, v.v.), taxi, xe tải và thậm chí xe buýt/máy bay/tàu điện ngầm (cần sáng tạo)',
    formula: 'Công Thức Lợi Nhuận Dài Hạn: Doanh Thu - Chi Phí (Nhiên Liệu và Khác) - Khấu Hao (3.33% * Giá Trị Xe mỗi năm) - Rủi Ro (10% * Phí Bảo Hiểm mỗi năm). Lưu ý: lợi nhuận ngắn hạn chỉ trừ chi phí nhiên liệu của chuyến đi',
    community: 'Tham gia <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Cộng đồng OpenSource</a> của chúng tôi',
    periodicityOptions: {
      annual: 'Hàng Năm',
      monthly: 'Hàng Tháng',
      weekly: 'Hàng Tuần',
      daily: 'Hàng Ngày'
    }
  },
  'ko': {
    title: '수익 계산기 (모든 플랫폼/차량)',
    subtitle: '단기 및 장기 의사 결정을 위해 설계',
    registerButton: '차량 데이터 등록',
    closeButton: '닫기',
    saveButton: '저장',
    fuelPrice: '리터당 연료 가격:',
    fuelEfficiency: '리터당 주행 거리:',
    insuranceValue: '보험 가치:',
    insurancePremium: '보험료:',
    maintenanceCosts: '유지 보수 비용:',
    addCost: '추가',
    remove: '제거',
    distance: '주행 거리:',
    workingDays: '주당 근무일:',
    vehicleValue: '차량 현재 가치:',
    rideValue: '지불 가치:',
    rideDistance: '주행 거리:',
    shortTermProfit: '단기 수익:',
    longTermProfit: '장기 수익:',
    tips: '팁:',
    tip1: '차량을 임대하는 경우 차량 가치를 0으로 설정하고 임대 비용을 유지 보수 비용에 포함',
    tip2: '모든 플랫폼과 차량에 사용 가능! 모든 운전자, 앱 기반 (Ifood, Uber, 99 등), 택시, 밴 및 심지어 버스/비행기/지하철 (창의력 필요)',
    formula: '장기 수익 공식: 수익 - 비용 (연료 및 기타) - 감가상각 (3.33% * 차량 가치 연간) - 위험 (10% * 보험료 연간). 참고: 단기 수익은 주행 연료 비용만 차감',
    community: '우리의 <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">오픈소스 커뮤니티</a>에 가입하세요',
    periodicityOptions: {
      annual: '연간',
      monthly: '월간',
      weekly: '주간',
      daily: '일일'
    }
  },
  'th': {
    title: 'เครื่องคำนวณกำไรการเดินทาง (ทุกแพลตฟอร์ม/ยานพาหนะ)',
    subtitle: 'ออกแบบสำหรับการตัดสินใจระยะสั้นและระยะยาว',
    registerButton: 'ลงทะเบียนข้อมูลยานพาหนะ',
    closeButton: 'ปิด',
    saveButton: 'บันทึก',
    fuelPrice: 'ราคาน้ำมันต่อลิตร:',
    fuelEfficiency: 'ระยะทางต่อลิตร:',
    insuranceValue: 'มูลค่าประกัน:',
    insurancePremium: 'เบี้ยประกัน:',
    maintenanceCosts: 'ค่าบำรุงรักษา:',
    addCost: 'เพิ่ม',
    remove: 'ลบ',
    distance: 'ระยะทางที่เดินทาง:',
    workingDays: 'วันทำงานต่อสัปดาห์:',
    vehicleValue: 'มูลค่าปัจจุบันของยานพาหนะ:',
    rideValue: 'ค่าจ้าง:',
    rideDistance: 'ระยะทางเดินทาง:',
    shortTermProfit: 'กำไรระยะสั้น:',
    longTermProfit: 'กำไรระยะยาว:',
    tips: 'คำแนะนำ:',
    tip1: 'หากคุณเช่ายานพาหนะ ให้ตั้งค่ามูลค่ายานพาหนะเป็นศูนย์และรวมค่าเช่าในค่าบำรุงรักษา',
    tip2: 'สามารถใช้ได้กับทุกแพลตฟอร์มและยานพาหนะ! สำหรับผู้ขับขี่ทั้งหมด ทั้งแอปพลิเคชัน (Ifood, Uber, 99 เป็นต้น) แท็กซี่ รถตู้ และแม้แต่รถบัส/เครื่องบิน/รถไฟใต้ดิน (ต้องใช้ความคิดสร้างสรรค์)',
    formula: 'สูตรกำไรระยะยาว: รายได้ - ค่าใช้จ่าย (น้ำมันและอื่นๆ) - ค่าเสื่อมราคา (3.33% * มูลค่ายานพาหนะต่อปี) - ความเสี่ยง (10% * เบี้ยประกันต่อปี). หมายเหตุ: กำไรระยะสั้นหักเฉพาะค่าน้ำมันของการเดินทาง',
    community: 'เข้าร่วม <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">ชุมชน OpenSource</a> ของเรา',
    periodicityOptions: {
      annual: 'รายปี',
      monthly: 'รายเดือน',
      weekly: 'รายสัปดาห์',
      daily: 'รายวัน'
    }
  },
  'fa': {
    title: 'ماشین حساب سود سفر (همه پلتفرم ها/وسایل نقلیه)',
    subtitle: 'برای تصمیم گیری کوتاه مدت و بلند مدت',
    registerButton: 'ثبت اطلاعات وسیله نقلیه',
    closeButton: 'بستن',
    saveButton: 'ذخیره',
    fuelPrice: 'قیمت سوخت در هر لیتر:',
    fuelEfficiency: 'مسافت طی شده در هر لیتر:',
    insuranceValue: 'مقدار بیمه:',
    insurancePremium: 'حق بیمه:',
    maintenanceCosts: 'هزینه های نگهداری:',
    addCost: 'اضافه کردن',
    remove: 'حذف',
    distance: 'مسافت طی شده:',
    workingDays: 'روزهای کاری در هفته:',
    vehicleValue: 'ارزش فعلی وسیله نقلیه:',
    rideValue: 'مقدار پرداختی:',
    rideDistance: 'مسافت سفر:',
    shortTermProfit: 'سود کوتاه مدت:',
    longTermProfit: 'سود بلند مدت:',
    tips: 'نکات:',
    tip1: 'اگر وسیله نقلیه را اجاره می دهید، مقدار وسیله نقلیه را صفر قرار دهید و هزینه اجاره را در هزینه های نگهداری شامل شوید',
    tip2: 'می تواند برای همه پلتفرم ها و وسایل نقلیه استفاده شود! برای همه رانندگان، برنامه ها (Ifood, Uber, 99 و غیره)، تاکسی ها، ون ها و حتی اتوبوس ها/هواپیماها/مترو (نیاز به خلاقیت دارد)',
    formula: 'فرمول سود بلند مدت: درآمد - هزینه ها (سوخت و سایر) - استهلاک (3.33% * ارزش وسیله نقلیه در سال) - ریسک (10% * حق بیمه در سال). توجه: سود کوتاه مدت فقط هزینه سوخت سفر را کسر می کند',
    community: 'به <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">جامعه اوپن سورس</a> ما بپیوندید',
    periodicityOptions: {
      annual: 'سالانه',
      monthly: 'ماهانه',
      weekly: 'هفتگی',
      daily: 'روزانه'
    }
  },
  'bn': {
    title: 'যাত্রার লাভ ক্যালকুলেটর (সমস্ত প্ল্যাটফর্ম/যানবাহন)',
    subtitle: 'সংক্ষিপ্ত ও দীর্ঘমেয়াদী সিদ্ধান্ত নেওয়ার জন্য',
    registerButton: 'যানবাহন ডেটা নিবন্ধন করুন',
    closeButton: 'বন্ধ করুন',
    saveButton: 'সংরক্ষণ করুন',
    fuelPrice: 'প্রতি লিটার জ্বালানির মূল্য:',
    fuelEfficiency: 'প্রতি লিটারে দূরত্ব:',
    insuranceValue: 'বীমা মূল্য:',
    insurancePremium: 'বীমা প্রিমিয়াম:',
    maintenanceCosts: 'রক্ষণাবেক্ষণ খরচ:',
    addCost: 'যোগ করুন',
    remove: 'অপসারণ',
    distance: 'দূরত্ব ভ্রমণ:',
    workingDays: 'প্রতি সপ্তাহে কাজের দিন:',
    vehicleValue: 'যানবাহনের বর্তমান মূল্য:',
    rideValue: 'প্রদত্ত মূল্য:',
    rideDistance: 'যাত্রার দূরত্ব:',
    shortTermProfit: 'স্বল্পমেয়াদী লাভ:',
    longTermProfit: 'দীর্ঘমেয়াদী লাভ:',
    tips: 'পরামর্শ:',
    tip1: 'আপনি যদি যানবাহন ভাড়া নেন, যানবাহনের মূল্য শূন্য সেট করুন এবং ভাড়া রক্ষণাবেক্ষণ খরচ অন্তর্ভুক্ত করুন',
    tip2: 'সমস্ত প্ল্যাটফর্ম এবং যানবাহনের জন্য ব্যবহার করা যেতে পারে! সমস্ত ড্রাইভারদের জন্য, অ্যাপ-ভিত্তিক (Ifood, Uber, 99 ইত্যাদি), ট্যাক্সি, ভ্যান এবং এমনকি বাস/বিমান/মেট্রো (সৃজনশীলতা প্রয়োজন)',
    formula: 'দীর্ঘমেয়াদী লাভ সূত্র: আয় - ব্যয় (জ্বালানি ও অন্যান্য) - অবচয় (3.33% * যানবাহনের মূল্য প্রতি বছর) - ঝুঁকি (10% * বীমা প্রিমিয়াম প্রতি বছর)। নোট: স্বল্পমেয়াদী লাভ শুধুমাত্র যাত্রার জ্বালানি খরচ কাটায়',
    community: 'আমাদের <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">ওপেন সোর্স কমিউনিটি</a> এ যোগ দিন',
    periodicityOptions: {
      annual: 'বার্ষিক',
      monthly: 'মাসিক',
      weekly: 'সাপ্তাহিক',
      daily: 'দৈনিক'
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
          <option value="hi">हिं</option>
          <option value="es">ES</option>
          <option value="it">IT</option>
          <option value="pa">ਪੰ</option>
          <option value="vi">VN</option>
          <option value="ko">한</option>
          <option value="th">ไทย</option>
          <option value="fa">فا</option>
          <option value="bn">বাং</option>
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
      {t.tip1}<br />
      {t.tip2}.<br /><br />
      {t.formula}.<br /><br />
      <div dangerouslySetInnerHTML={{ __html: t.community}}/>
    </p>
    </div>
  );
}
