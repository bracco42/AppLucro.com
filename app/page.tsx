'use client';

import React, { useState, useEffect } from 'react';

type Periodicity = 'annual' | 'monthly' | 'daily' | 'weekly';

type Cost = {
  id: number;
  valor: number;
  periodicity: Periodicity;
};

type Language = 'pt' | 'en' | 'fr' | 'zh' | 'ja' | 'ar' | 'de' | 'ru' | 'uk' | 'da' | 'tr' | 'sw' | 'hi' | 'es' | 'it' | 'pa' | 'vi' | 'ko' | 'th' | 'fa' | 'bn';
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
    timeSpent: 'Tempo trabalhado:',
    workingHours: 'Horas/dia (1-16):',
    workingDays: 'Dias/semana (1-7):',
    vehicleValue: 'Valor Atual do Veículo:',
    rideValue: 'Valor Pago:',
    rideDistance: 'Distância da Corrida (km):',
    rideTime: 'Tempo da Corrida (minutos):',
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
    subtitle: 'For short and long term decision making',
    registerButton: 'Register Vehicle Data',
    closeButton: 'Close Registration',
    saveButton: 'Save',
    fuelPrice: 'Fuel Price per Liter:',
    fuelEfficiency: 'Distance per Liter:',
    insuranceValue: 'Insurance Value:',
    insurancePremium: 'Insurance Premium:',
    maintenanceCosts: 'Maintenance Costs:',
    addCost: 'Add Cost',
    remove: 'Remove',
    distance: 'Distance traveled:',
    timeSpent: 'Time worked:',
    workingHours: 'Hours/day (1-16):',
    workingDays: 'Days/week (1-7):',
    vehicleValue: 'Current Vehicle Value:',
    rideValue: 'Paid Value:',
    rideDistance: 'Ride Distance (km):',
    rideTime: 'Ride Time (minutes):',
    shortTermProfit: 'Short Term Profit:',
    longTermProfit: 'Long Term Profit:',
    tips: 'Tips:',
    tip1: 'If you rent the vehicle, set the vehicle value to zero and include the rental value in maintenance costs.',
    tip2: 'Can be used for all platforms and vehicles! For all drivers, app-based (Ifood, Uber, 99, etc.), taxis, vans and even buses/planes/subways (requires creativity)',
    formula: 'Long Term Profit Formula: Revenue - Expenses (Fuel and Others) - Depreciation (3.33% * Vehicle Value per year) - Risk (10% * Insurance Premium per year). Note: short term profit only deducts ride fuel cost',
    community: 'Join our <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">OpenSource Community</a>!!!',
    periodicityOptions: {
      annual: 'Annual',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily'
    }
  },
  'es': {
    title: 'Calculadora de Ganancias (Todas Plataformas/Vehículos)',
    subtitle: 'Para decisiones a corto y largo plazo',
    registerButton: 'Registrar Datos del Vehículo',
    closeButton: 'Cerrar Registro',
    saveButton: 'Guardar',
    fuelPrice: 'Precio Combustible por Litro:',
    fuelEfficiency: 'Distancia por Litro:',
    insuranceValue: 'Valor del Seguro:',
    insurancePremium: 'Prima del Seguro:',
    maintenanceCosts: 'Costos de Mantenimiento:',
    addCost: 'Agregar Costo',
    remove: 'Eliminar',
    distance: 'Distancia recorrida:',
    timeSpent: 'Tiempo trabajado:',
    workingHours: 'Horas/día (1-16):',
    workingDays: 'Días/semana (1-7):',
    vehicleValue: 'Valor Actual del Vehículo:',
    rideValue: 'Valor Pagado:',
    rideDistance: 'Distancia del Viaje (km):',
    rideTime: 'Tiempo del Viaje (minutos):',
    shortTermProfit: 'Ganancia Corto Plazo:',
    longTermProfit: 'Ganancia Largo Plazo:',
    tips: 'Consejos:',
    tip1: 'Si alquilas el vehículo, establece su valor en cero e incluye el alquiler en los costos.',
    tip2: '¡Útil para todas las plataformas! Conductores de apps (Ifood, Uber, 99), taxis, furgonetas y hasta buses/aviones (usa tu creatividad)',
    formula: 'Fórmula Largo Plazo: Ingresos - Gastos (Combustible y otros) - Depreciación (3.33% * Valor/año) - Riesgo (10% * Prima/año). Nota: ganancia corto plazo solo descuenta combustible',
    community: 'Únete a nuestra <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Comunidad OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Anual',
      monthly: 'Mensual',
      weekly: 'Semanal',
      daily: 'Diario'
    }
  },
  'fr': {
    title: 'Calculateur de Bénéfices (Toutes Plateformes/Véhicules)',
    subtitle: 'Pour décisions à court/long terme',
    registerButton: 'Enregistrer Données Véhicule',
    closeButton: 'Fermer Enregistrement',
    saveButton: 'Enregistrer',
    fuelPrice: 'Prix Carburant par Litre:',
    fuelEfficiency: 'Distance par Litre:',
    insuranceValue: 'Valeur Assurance:',
    insurancePremium: 'Prime Assurance:',
    maintenanceCosts: 'Coûts Maintenance:',
    addCost: 'Ajouter Coût',
    remove: 'Supprimer',
    distance: 'Distance parcourue:',
    timeSpent: 'Temps travaillé:',
    workingHours: 'Heures/jour (1-16):',
    workingDays: 'Jours/semaine (1-7):',
    vehicleValue: 'Valeur Actuelle Véhicule:',
    rideValue: 'Valeur Payée:',
    rideDistance: 'Distance Course (km):',
    rideTime: 'Temps Course (minutes):',
    shortTermProfit: 'Bénéfice Court Terme:',
    longTermProfit: 'Bénéfice Long Terme:',
    tips: 'Conseils:',
    tip1: 'Si vous louez le véhicule, mettez sa valeur à zéro et incluez le loyer dans les coûts.',
    tip2: 'Utilisable pour toutes plateformes! Conducteurs d\'apps (Ifood, Uber...), taxis, fourgonnettes et même bus/avions (soyez créatifs!)',
    formula: 'Formule Long Terme: Revenus - Dépenses (Carburant etc.) - Dépréciation (3.33% * Valeur/an) - Risque (10% * Prime/an). NB: bénéfice court terme ne déduit que le carburant',
    community: 'Rejoignez notre <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Communauté OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Annuel',
      monthly: 'Mensuel',
      weekly: 'Hebdomadaire',
      daily: 'Quotidien'
    }
  },
  'de': {
    title: 'Fahrtkostenrechner (Alle Plattformen/Fahrzeuge)',
    subtitle: 'Für kurzfristige/langfristige Entscheidungen',
    registerButton: 'Fahrzeugdaten registrieren',
    closeButton: 'Registrierung schließen',
    saveButton: 'Speichern',
    fuelPrice: 'Kraftstoffpreis pro Liter:',
    fuelEfficiency: 'Distanz pro Liter:',
    insuranceValue: 'Versicherungswert:',
    insurancePremium: 'Versicherungsprämie:',
    maintenanceCosts: 'Wartungskosten:',
    addCost: 'Kosten hinzufügen',
    remove: 'Entfernen',
    distance: 'Zurückgelegte Strecke:',
    timeSpent: 'Gearbeitete Zeit:',
    workingHours: 'Stunden/Tag (1-16):',
    workingDays: 'Tage/Woche (1-7):',
    vehicleValue: 'Aktueller Fahrzeugwert:',
    rideValue: 'Bezahlter Betrag:',
    rideDistance: 'Fahrtstrecke (km):',
    rideTime: 'Fahrtzeit (Minuten):',
    shortTermProfit: 'Kurzfristiger Gewinn:',
    longTermProfit: 'Langfristiger Gewinn:',
    tips: 'Tipps:',
    tip1: 'Bei Mietfahrzeugen Wert auf 0 setzen und Mietkosten zu Wartungskosten addieren.',
    tip2: 'Für alle Plattformen nutzbar! App-Fahrer (Ifood, Uber...), Taxis, Transporter und sogar Busse/Flugzeuge (Kreativität erforderlich)',
    formula: 'Langfristige Gewinnformel: Einnahmen - Ausgaben (Kraftstoff etc.) - Abschreibung (3.33% * Fahrzeugwert/Jahr) - Risiko (10% * Prämie/Jahr). Hinweis: Kurzfristiger Gewinn berücksichtigt nur Kraftstoffkosten',
    community: 'Treten Sie unserer <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">OpenSource-Community</a> bei!!!',
    periodicityOptions: {
      annual: 'Jährlich',
      monthly: 'Monatlich',
      weekly: 'Wöchentlich',
      daily: 'Täglich'
    }
  },
  'it': {
    title: 'Calcolatore Guadagni (Tutte Piattaforme/Veicoli)',
    subtitle: 'Per decisioni a breve/lungo termine',
    registerButton: 'Registra Dati Veicolo',
    closeButton: 'Chiudi Registrazione',
    saveButton: 'Salva',
    fuelPrice: 'Prezzo Carburante al Litro:',
    fuelEfficiency: 'Distanza per Litro:',
    insuranceValue: 'Valore Assicurazione:',
    insurancePremium: 'Premio Assicurazione:',
    maintenanceCosts: 'Costi Manutenzione:',
    addCost: 'Aggiungi Costo',
    remove: 'Rimuovi',
    distance: 'Distanza percorsa:',
    timeSpent: 'Tempo lavorato:',
    workingHours: 'Ore/giorno (1-16):',
    workingDays: 'Giorni/settimana (1-7):',
    vehicleValue: 'Valore Attuale Veicolo:',
    rideValue: 'Valore Pagato:',
    rideDistance: 'Distanza Corsa (km):',
    rideTime: 'Tempo Corsa (minuti):',
    shortTermProfit: 'Guadagno Breve Termine:',
    longTermProfit: 'Guadagno Lungo Termine:',
    tips: 'Consigli:',
    tip1: 'Se noleggi il veicolo, imposta il valore a zero e includi il noleggio nei costi.',
    tip2: 'Utilizzabile per tutte le piattaforme! Driver di app (Ifood, Uber...), taxi, furgoni e persino bus/aerei (usa la creatività!)',
    formula: 'Formula Lungo Termine: Entrate - Spese (Carburante etc.) - Svalutazione (3.33% * Valore/anno) - Rischio (10% * Premio/anno). Nota: guadagno breve termine deduce solo il carburante',
    community: 'Unisciti alla nostra <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Comunità OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Annuale',
      monthly: 'Mensile',
      weekly: 'Settimanale',
      daily: 'Giornaliero'
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
    timeSpent: '工作时间:',
    workingHours: '小时/天 (1-16):',
    workingDays: '天/周 (1-7):',
    vehicleValue: '车辆现值:',
    rideValue: '支付金额:',
    rideDistance: '行程距离 (km):',
    rideTime: '行程时间 (分钟):',
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
    timeSpent: '作業時間:',
    workingHours: '時間/日 (1-16):',
    workingDays: '日/週 (1-7):',
    vehicleValue: '車両価値:',
    rideValue: '支払額:',
    rideDistance: '配達距離 (km):',
    rideTime: '配達時間 (分):',
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
    timeSpent: 'الوقت العامل:',
    workingHours: 'ساعات/يوم (1-16):',
    workingDays: 'أيام/أسبوع (1-7):',
    vehicleValue: 'قيمة المركبة الحالية:',
    rideValue: 'القيمة المدفوعة:',
    rideDistance: 'مسافة الرحلة (كم):',
    rideTime: 'وقت الرحلة (دقائق):',
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
    timeSpent: 'Отработанное время:',
    workingHours: 'Часы/день (1-16):',
    workingDays: 'Дни/неделю (1-7):',
    vehicleValue: 'Текущая стоимость ТС:',
    rideValue: 'Оплаченная сумма:',
    rideDistance: 'Расстояние поездки (км):',
    rideTime: 'Время поездки (мин):',
    shortTermProfit: 'Краткосрочная прибыль:',
    longTermProfit: 'Долгосрочная прибыль:',
    tips: 'Советы:',
    tip1: 'Для арендованных ТС установите стоимость 0 и включите аренду в затраты',
    tip2: 'Подходит для всех платформ и ТС! Водители приложений (Ifood, Uber, 99), такси, фургоны и даже автобусы/самолёты (требуется креативность)',
    formula: 'Формула долгосрочной прибыли: Доход - Расходы (топливо и др.) - Амортизация (3.33% * Стоимость ТС в год) - Риск (10% * Страховая премия в год). Прим.: краткосрочная прибыль учитывает только затраты на топливо',
    community: 'Присоединяйтесь к нашему <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">сообществу OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Год',
      monthly: 'Месяц',
      weekly: 'Неделя',
      daily: 'День'
    }
  },
  'hi': { // Hindi
    title: 'सवारी लाभ कैलकुलेटर (सभी प्लेटफॉर्म/वाहन)',
    subtitle: 'कम और लंबी अवधि के निर्णय लेने के लिए',
    registerButton: 'वाहन डेटा पंजीकृत करें',
    closeButton: 'बंद करें',
    saveButton: 'सहेजें',
    fuelPrice: 'प्रति लीटर ईंधन की कीमत:',
    fuelEfficiency: 'प्रति लीटर दूरी:',
    insuranceValue: 'बीमा मूल्य:',
    insurancePremium: 'बीमा प्रीमियम:',
    maintenanceCosts: 'रखरखाव लागत:',
    addCost: 'जोड़ें',
    remove: 'हटाएं',
    distance: 'तय दूरी:',
    timeSpent: 'काम का समय:',
    workingHours: 'घंटे/दिन (1-16):',
    workingDays: 'दिन/सप्ताह (1-7):',
    vehicleValue: 'वाहन का वर्तमान मूल्य:',
    rideValue: 'भुगतान राशि:',
    rideDistance: 'सवारी दूरी (किमी):',
    rideTime: 'सवारी समय (मिनट):',
    shortTermProfit: 'अल्पकालिक लाभ:',
    longTermProfit: 'दीर्घकालिक लाभ:',
    tips: 'टिप्स:',
    tip1: 'वाहन किराए पर लेने पर मूल्य शून्य पर सेट करें और किराया रखरखाव लागत में शामिल करें',
    tip2: 'सभी प्लेटफॉर्म और वाहनों के लिए उपयोगी! ऐप ड्राइवर (इफूड, उबर, 99), टैक्सी, वैन और यहां तक कि बस/विमान भी (रचनात्मकता आवश्यक)',
    formula: 'दीर्घकालिक लाभ सूत्र: आय - व्यय (ईंधन आदि) - मूल्यह्रास (3.33% * वाहन मूल्य/वर्ष) - जोखिम (10% * प्रीमियम/वर्ष)। नोट: अल्पकालिक लाभ केवल ईंधन लागत घटाता है',
    community: 'हमारे <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">ओपनसोर्स समुदाय</a> से जुड़ें!!!',
    periodicityOptions: {
      annual: 'वार्षिक',
      monthly: 'मासिक',
      weekly: 'साप्ताहिक',
      daily: 'दैनिक'
    }
  },
  'pa': { // Punjabi
    title: 'ਸਵਾਰੀ ਲਾਭ ਕੈਲਕੁਲੇਟਰ (ਸਾਰੇ ਪਲੇਟਫਾਰਮ/ਵਾਹਨ)',
    subtitle: 'ਛੋਟੇ ਅਤੇ ਲੰਬੇ ਸਮੇਂ ਦੇ ਫੈਸਲੇ ਲਈ',
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
    timeSpent: 'ਕੰਮ ਦਾ ਸਮਾਂ:',
    workingHours: 'ਘੰਟੇ/ਦਿਨ (1-16):',
    workingDays: 'ਦਿਨ/ਹਫ਼ਤਾ (1-7):',
    vehicleValue: 'ਵਾਹਨ ਦਾ ਮੌਜੂਦਾ ਮੁੱਲ:',
    rideValue: 'ਭੁਗਤਾਨ ਕੀਤਾ ਮੁੱਲ:',
    rideDistance: 'ਸਵਾਰੀ ਦੂਰੀ (ਕਿਮੀ):',
    rideTime: 'ਸਵਾਰੀ ਸਮਾਂ (ਮਿੰਟ):',
    shortTermProfit: 'ਛੋਟੇ ਸਮੇਂ ਦਾ ਲਾਭ:',
    longTermProfit: 'ਲੰਬੇ ਸਮੇਂ ਦਾ ਲਾਭ:',
    tips: 'ਸੁਝਾਅ:',
    tip1: 'ਜੇਕਰ ਤੁਸੀਂ ਵਾਹਨ ਕਿਰਾਏ \'ਤੇ ਲੈਂਦੇ ਹੋ, ਤਾਂ ਵਾਹਨ ਦਾ ਮੁੱਲ ਜ਼ੀਰੋ \'ਤੇ ਸੈੱਟ ਕਰੋ ਅਤੇ ਕਿਰਾਏ ਨੂੰ ਰੱਖ-ਰਖਾਅ ਲਾਗਤ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ',
    tip2: 'ਸਾਰੇ ਪਲੇਟਫਾਰਮ ਅਤੇ ਵਾਹਨਾਂ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ! ਸਾਰੇ ਡਰਾਈਵਰਾਂ ਲਈ, ਐਪ-ਅਧਾਰਿਤ (ਇਫੂਡ, ਉਬਰ, 99 ਆਦਿ), ਟੈਕਸੀ, ਵੈਨ ਅਤੇ ਯਹਾਂ ਤੱਕ ਕਿ ਬੱਸਾਂ/ਜਹਾਜ਼/ਮੈਟਰੋ (ਰਚਨਾਤਮਕਤਾ ਦੀ ਲੋੜ ਹੈ)',
    formula: 'ਲੰਬੇ ਸਮੇਂ ਦੇ ਲਾਭ ਦਾ ਫਾਰਮੂਲਾ: ਆਮਦਨ - ਖਰਚ (ਈਂਧਨ ਅਤੇ ਹੋਰ) - ਮੁੱਲ ਘਟਾਓ (3.33% * ਵਾਹਨ ਮੁੱਲ ਪ੍ਰਤੀ ਸਾਲ) - ਜੋਖਮ (10% * ਬੀਮਾ ਪ੍ਰੀਮੀਅਮ ਪ੍ਰਤੀ ਸਾਲ)। ਨੋਟ: ਛੋਟੇ ਸਮੇਂ ਦਾ ਲਾਭ ਸਿਰਫ਼ ਸਵਾਰੀ ਦੀ ਈਂਧਨ ਲਾਗਤ ਨੂੰ ਘਟਾਉਂਦਾ ਹੈ',
    community: 'ਸਾਡੇ <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">ਓਪਨਸੋਰਸ ਕਮਿਊਨਿਟੀ</a> ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ!!!',
    periodicityOptions: {
      annual: 'ਸਾਲਾਨਾ',
      monthly: 'ਮਹੀਨਾਵਾਰ',
      weekly: 'ਹਫ਼ਤਾਵਾਰ',
      daily: 'ਰੋਜ਼ਾਨਾ'
    }
  },
  'bn': { // Bengali
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
    timeSpent: 'কাজের সময়:',
    workingHours: 'ঘন্টা/দিন (1-16):',
    workingDays: 'দিন/সপ্তাহ (1-7):',
    vehicleValue: 'যানবাহনের বর্তমান মূল্য:',
    rideValue: 'প্রদত্ত মূল্য:',
    rideDistance: 'যাত্রার দূরত্ব (কিমি):',
    rideTime: 'যাত্রার সময় (মিনিট):',
    shortTermProfit: 'স্বল্পমেয়াদী লাভ:',
    longTermProfit: 'দীর্ঘমেয়াদী লাভ:',
    tips: 'পরামর্শ:',
    tip1: 'আপনি যদি যানবাহন ভাড়া নেন, যানবাহনের মূল্য শূন্য সেট করুন এবং ভাড়া রক্ষণাবেক্ষণ খরচ অন্তর্ভুক্ত করুন',
    tip2: 'সমস্ত প্ল্যাটফর্ম এবং যানবাহনের জন্য ব্যবহার করা যেতে পারে! সমস্ত ড্রাইভারদের জন্য, অ্যাপ-ভিত্তিক (ইফুড, উবার, 99 ইত্যাদি), ট্যাক্সি, ভ্যান এবং এমনকি বাস/বিমান/মেট্রো (সৃজনশীলতা প্রয়োজন)',
    formula: 'দীর্ঘমেয়াদী লাভ সূত্র: আয় - ব্যয় (জ্বালানি ও অন্যান্য) - অবচয় (3.33% * যানবাহনের মূল্য প্রতি বছর) - ঝুঁকি (10% * বীমা প্রিমিয়াম প্রতি বছর)। নোট: স্বল্পমেয়াদী লাভ শুধুমাত্র যাত্রার জ্বালানি খরচ কাটায়',
    community: 'আমাদের <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">ওপেন সোর্স কমিউনিটি</a> এ যোগ দিন!!!',
    periodicityOptions: {
      annual: 'বার্ষিক',
      monthly: 'মাসিক',
      weekly: 'সাপ্তাহিক',
      daily: 'দৈনিক'
    }
  },
  'ko': { // Korean
    title: '수익 계산기 (모든 플랫폼/차량)',
    subtitle: '단기 및 장기 의사 결정을 위해',
    registerButton: '차량 데이터 등록',
    closeButton: '닫기',
    saveButton: '저장',
    fuelPrice: '리터당 연료 가격:',
    fuelEfficiency: '리터당 거리:',
    insuranceValue: '보험 가치:',
    insurancePremium: '보험료:',
    maintenanceCosts: '유지 보수 비용:',
    addCost: '추가',
    remove: '제거',
    distance: '주행 거리:',
    timeSpent: '작업 시간:',
    workingHours: '시간/일 (1-16):',
    workingDays: '일/주 (1-7):',
    vehicleValue: '차량 현재 가치:',
    rideValue: '지불 가치:',
    rideDistance: '탑승 거리 (km):',
    rideTime: '탑승 시간 (분):',
    shortTermProfit: '단기 수익:',
    longTermProfit: '장기 수익:',
    tips: '팁:',
    tip1: '차량을 임대하는 경우 차량 가치를 0으로 설정하고 임대 비용을 유지 관리 비용에 포함',
    tip2: '모든 플랫폼 및 차량에 사용 가능! 앱 기반 (Ifood, Uber, 99 등), 택시, 밴 및 심지어 버스/비행기/지하철 (창의력 필요)',
    formula: '장기 수익 공식: 수익 - 비용 (연료 및 기타) - 감가 상각 (3.33% * 차량 가치/년) - 위험 (10% * 보험료/년). 참고: 단기 수익은 주행 연료 비용만 공제',
    community: '우리의 <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">오픈소스 커뮤니티</a>에 가입하세요!!!',
    periodicityOptions: {
      annual: '연간',
      monthly: '월간',
      weekly: '주간',
      daily: '일일'
    }
  },
  'vi': { // Vietnamese
    title: 'Máy Tính Lợi Nhuận Chuyến Đi (Tất Cả Nền Tảng/Xe)',
    subtitle: 'Cho quyết định ngắn hạn và dài hạn',
    registerButton: 'Đăng Ký Dữ Liệu Xe',
    closeButton: 'Đóng',
    saveButton: 'Lưu',
    fuelPrice: 'Giá Nhiên Liệu mỗi Lít:',
    fuelEfficiency: 'Khoảng Cách mỗi Lít:',
    insuranceValue: 'Giá Trị Bảo Hiểm:',
    insurancePremium: 'Phí Bảo Hiểm:',
    maintenanceCosts: 'Chi Phí Bảo Trì:',
    addCost: 'Thêm',
    remove: 'Xóa',
    distance: 'Khoảng cách di chuyển:',
    timeSpent: 'Thời gian làm việc:',
    workingHours: 'Giờ/ngày (1-16):',
    workingDays: 'Ngày/tuần (1-7):',
    vehicleValue: 'Giá Trị Hiện Tại Xe:',
    rideValue: 'Giá Trị Thanh Toán:',
    rideDistance: 'Khoảng Cách Chuyến Đi (km):',
    rideTime: 'Thời Gian Chuyến Đi (phút):',
    shortTermProfit: 'Lợi Nhuận Ngắn Hạn:',
    longTermProfit: 'Lợi Nhuận Dài Hạn:',
    tips: 'Mẹo:',
    tip1: 'Nếu thuê xe, đặt giá trị xe thành 0 và bao gồm tiền thuê trong chi phí bảo trì',
    tip2: 'Dùng được cho mọi nền tảng và xe! Tài xế ứng dụng (Ifood, Uber, 99...), taxi, xe tải và cả xe buýt/máy bay (cần sáng tạo)',
    formula: 'Công thức Lợi Nhuận Dài Hạn: Doanh Thu - Chi Phí (Nhiên Liệu...) - Khấu Hao (3.33% * Giá Trị Xe/năm) - Rủi Ro (10% * Phí Bảo Hiểm/năm). Lưu ý: lợi nhuận ngắn hạn chỉ trừ chi phí nhiên liệu',
    community: 'Tham gia <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Cộng Đồng OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Hàng Năm',
      monthly: 'Hàng Tháng',
      weekly: 'Hàng Tuần',
      daily: 'Hàng Ngày'
    }
  },
  'th': { // Thai
    title: 'เครื่องคำนวณกำไรการเดินทาง (ทุกแพลตฟอร์ม/ยานพาหนะ)',
    subtitle: 'สำหรับการตัดสินใจระยะสั้นและระยะยาว',
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
    timeSpent: 'เวลาทำงาน:',
    workingHours: 'ชั่วโมง/วัน (1-16):',
    workingDays: 'วัน/สัปดาห์ (1-7):',
    vehicleValue: 'มูลค่าปัจจุบันของยานพาหนะ:',
    rideValue: 'ค่าจ้าง:',
    rideDistance: 'ระยะทางเดินทาง (กม.):',
    rideTime: 'เวลาเดินทาง (นาที):',
    shortTermProfit: 'กำไรระยะสั้น:',
    longTermProfit: 'กำไรระยะยาว:',
    tips: 'คำแนะนำ:',
    tip1: 'หากเช่ายานพาหนะ ให้ตั้งค่ามูลค่าเป็นศูนย์และรวมค่าเช่าในค่าบำรุงรักษา',
    tip2: 'ใช้ได้กับทุกแพลตฟอร์มและยานพาหนะ! คนขับแอป (Ifood, Uber, 99...), แท็กซี่, รถตู้ และแม้แต่รถบัส/เครื่องบิน (ต้องมีความคิดสร้างสรรค์)',
    formula: 'สูตรกำไรระยะยาว: รายได้ - ค่าใช้จ่าย (น้ำมัน...) - ค่าเสื่อมราคา (3.33% * มูลค่ายานพาหนะ/ปี) - ความเสี่ยง (10% * เบี้ยประกัน/ปี). หมายเหตุ: กำไรระยะสั้นหักเฉพาะค่าน้ำมัน',
    community: 'เข้าร่วม <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">ชุมชน OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'รายปี',
      monthly: 'รายเดือน',
      weekly: 'รายสัปดาห์',
      daily: 'รายวัน'
    }
  },
  'tr': { // Turkish
    title: 'Sürüş Kar Hesaplayıcı (Tüm Platformlar/Araçlar)',
    subtitle: 'Kısa ve uzun vadeli kararlar için',
    registerButton: 'Araç Verisi Kaydet',
    closeButton: 'Kapat',
    saveButton: 'Kaydet',
    fuelPrice: 'Litre Başına Yakıt Fiyatı:',
    fuelEfficiency: 'Litre Başına Mesafe:',
    insuranceValue: 'Sigorta Değeri:',
    insurancePremium: 'Sigorta Primi:',
    maintenanceCosts: 'Bakım Maliyetleri:',
    addCost: 'Ekle',
    remove: 'Sil',
    distance: 'Kat Edilen Mesafe:',
    timeSpent: 'Çalışma Süresi:',
    workingHours: 'Saat/Gün (1-16):',
    workingDays: 'Gün/Hafta (1-7):',
    vehicleValue: 'Aracın Mevcut Değeri:',
    rideValue: 'Ödenen Tutar:',
    rideDistance: 'Sürüş Mesafesi (km):',
    rideTime: 'Sürüş Süresi (dakika):',
    shortTermProfit: 'Kısa Vadeli Kar:',
    longTermProfit: 'Uzun Vadeli Kar:',
    tips: 'İpuçları:',
    tip1: 'Araç kiralıyorsanız değeri sıfırlayın ve kira ücretini bakım maliyetine ekleyin',
    tip2: 'Tüm platformlar ve araçlar için kullanılabilir! Uygulama sürücüleri (Ifood, Uber, 99...), taksi, minibüs ve hatta otobüs/uçak (yaratıcılık gerekir)',
    formula: 'Uzun Vadeli Kar Formülü: Gelir - Giderler (Yakıt...) - Amortisman (3.33% * Araç Değeri/yıl) - Risk (10% * Primi/yıl). Not: kısa vadeli kar yalnızca yakıt maliyetini düşürür',
    community: '<a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Açık Kaynak Topluluğumuza</a> katılın!!!',
    periodicityOptions: {
      annual: 'Yıllık',
      monthly: 'Aylık',
      weekly: 'Haftalık',
      daily: 'Günlük'
    }
  },
  'fa': { // Persian
    title: 'ماشین حساب سود سفر (همه پلتفرم ها/وسایل نقلیه)',
    subtitle: 'برای تصمیم گیری کوتاه مدت و بلند مدت',
    registerButton: 'ثبت اطلاعات وسیله نقلیه',
    closeButton: 'بستن',
    saveButton: 'ذخیره',
    fuelPrice: 'قیمت سوخت در هر لیتر:',
    fuelEfficiency: 'مسافت در هر لیتر:',
    insuranceValue: 'مقدار بیمه:',
    insurancePremium: 'حق بیمه:',
    maintenanceCosts: 'هزینه های نگهداری:',
    addCost: 'اضافه کردن',
    remove: 'حذف',
    distance: 'مسافت طی شده:',
    timeSpent: 'زمان کار:',
    workingHours: 'ساعت/روز (1-16):',
    workingDays: 'روز/هفته (1-7):',
    vehicleValue: 'ارزش فعلی وسیله نقلیه:',
    rideValue: 'مقدار پرداختی:',
    rideDistance: 'مسافت سفر (کیلومتر):',
    rideTime: 'زمان سفر (دقیقه):',
    shortTermProfit: 'سود کوتاه مدت:',
    longTermProfit: 'سود بلند مدت:',
    tips: 'نکات:',
    tip1: 'اگر وسیله نقلیه را اجاره می دهید، مقدار را صفر قرار دهید و اجاره را در هزینه ها لحاظ کنید',
    tip2: 'برای همه پلتفرم ها و وسایل نقلیه قابل استفاده است! رانندگان اپلیکیشن (Ifood, Uber, 99...)، تاکسی، ون و حتی اتوبوس/هواپیما (نیاز به خلاقیت دارد)',
    formula: 'فرمول سود بلند مدت: درآمد - هزینه ها (سوخت...) - استهلاک (3.33% * ارزش وسیله نقلیه/سال) - ریسک (10% * حق بیمه/سال). توجه: سود کوتاه مدت فقط هزینه سوخت را کسر می کند',
    community: 'به <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">جامعه اوپن سورس</a> ما بپیوندید!!!',
    periodicityOptions: {
      annual: 'سالانه',
      monthly: 'ماهانه',
      weekly: 'هفتگی',
      daily: 'روزانه'
    }
  },
  'uk': { // Ukrainian
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
    timeSpent: 'Час роботи:',
    workingHours: 'Годин/день (1-16):',
    workingDays: 'Днів/тиждень (1-7):',
    vehicleValue: 'Поточна вартість ТЗ:',
    rideValue: 'Оплачена сума:',
    rideDistance: 'Відстань поїздки (км):',
    rideTime: 'Час поїздки (хв):',
    shortTermProfit: 'Короткостроковий прибуток:',
    longTermProfit: 'Довгостроковий прибуток:',
    tips: 'Поради:',
    tip1: 'Для орендованих ТЗ встановіть вартість 0 та додайте оренду до витрат',
    tip2: 'Підходить для всіх платформ і ТЗ! Водії додатків (Ifood, Uber, 99...), таксі, фургони та навіть автобуси/літаки (потрібна креативність)',
    formula: 'Формула довгострокового прибутку: Дохід - Витрати (Паливо...) - Амортизація (3.33% * Вартість ТЗ/рік) - Ризик (10% * Премія/рік). Примітка: короткостроковий прибуток враховує лише витрати на паливо',
    community: 'Приєднуйтесь до нашої <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">спільноти OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Річний',
      monthly: 'Місячний',
      weekly: 'Тижневий',
      daily: 'Щоденний'
    }
  },
  'sw': { // Swahili
    title: 'Kikokotoo cha Faida ya Usafiri (Mifumo Yote/Magari)',
    subtitle: 'Kwa maamuzi ya muda mfupi na mrefu',
    registerButton: 'Sajili Data ya Gari',
    closeButton: 'Funga',
    saveButton: 'Hifadhi',
    fuelPrice: 'Bei ya Mafuta kwa Lita:',
    fuelEfficiency: 'Umbali kwa Lita:',
    insuranceValue: 'Thamani ya Bima:',
    insurancePremium: 'Malipo ya Bima:',
    maintenanceCosts: 'Gharama za Ukarabati:',
    addCost: 'Ongeza',
    remove: 'Ondoa',
    distance: 'Umbali uliosafiri:',
    timeSpent: 'Muda wa Kazi:',
    workingHours: 'Saa/Siku (1-16):',
    workingDays: 'Siku/Juma (1-7):',
    vehicleValue: 'Thamani ya Sasa ya Gari:',
    rideValue: 'Thamani Iliyolipwa:',
    rideDistance: 'Umbali wa Safari (km):',
    rideTime: 'Muda wa Safari (dakika):',
    shortTermProfit: 'Faida ya Muda Mfupi:',
    longTermProfit: 'Faida ya Muda Mrefu:',
    tips: 'Vidokezo:',
    tip1: 'Ukikodisha gari, weka thamani kwa sifuri na ujumuishe kodi kwenye gharama',
    tip2: 'Inatumika kwa mifumo yote na magari! Madereva wa programu (Ifood, Uber, 99...), teksi, vani na hata basi/ndege (unahitaji ubunifu)',
    formula: 'Fomula ya Faida ya Muda Mrefu: Mapato - Matumizi (Mafuta...) - Mshuko wa Thamani (3.33% * Thamani ya Gari/mwaka) - Hatari (10% * Malipo ya Bima/mwaka). Kumbuka: faida ya muda mfupu inatoa tu gharama ya mafuta',
    community: 'Jiunge na <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Jumuiya yetu ya OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Mwaka',
      monthly: 'Mwezi',
      weekly: 'Wiki',
      daily: 'Siku'
    }
  },
  'da': { // Danish
    title: 'Kørselsprofitberegner (Alle platforme/køretøjer)',
    subtitle: 'Til kort- og langsigtede beslutninger',
    registerButton: 'Registrer Køretøjsdata',
    closeButton: 'Luk',
    saveButton: 'Gem',
    fuelPrice: 'Brændstofpris pr. Liter:',
    fuelEfficiency: 'Distance pr. Liter:',
    insuranceValue: 'Forsikringsværdi:',
    insurancePremium: 'Forsikringspræmie:',
    maintenanceCosts: 'Vedligeholdelsesomkostninger:',
    addCost: 'Tilføj',
    remove: 'Fjern',
    distance: 'Kørt distance:',
    timeSpent: 'Arbejdstid:',
    workingHours: 'Timer/dag (1-16):',
    workingDays: 'Dage/uge (1-7):',
    vehicleValue: 'Nuværende køretøjsværdi:',
    rideValue: 'Betalt beløb:',
    rideDistance: 'Kørselsdistance (km):',
    rideTime: 'Kørselsvarighed (minutter):',
    shortTermProfit: 'Kortsigtet profit:',
    longTermProfit: 'Langsigtet profit:',
    tips: 'Tips:',
    tip1: 'Ved leje af køretøj, sæt værdi til 0 og inkluder leje i omkostninger',
    tip2: 'Brugbart til alle platforme og køretøjer! App-chauffører (Ifood, Uber, 99...), taxaer, varevogne og endda busser/fly (kræver kreativitet)',
    formula: 'Langsigtet profitformel: Indtægt - Udgifter (Brændstof...) - Afskrivning (3.33% * Køretøjsværdi/år) - Risiko (10% * Præmie/år). Bemærk: kortsigtet profit fratrækker kun brændstofomkostninger',
    community: 'Tilmeld dig vores <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">OpenSource-fællesskab</a>!!!',
    periodicityOptions: {
      annual: 'Årlig',
      monthly: 'Månedlig',
      weekly: 'Ugentlig',
      daily: 'Daglig'
    }
  }
};

export default function CalculoLucro() {
  // Dados do veículo
  const [precoCombustivel, setPrecoCombustivel] = useState<string>('5');
  const [kmPorLitro, setKmPorLitro] = useState<string>('10');
  const [valorSeguro, setValorSeguro] = useState<string>('2000');
  const [periodicidadeSeguro, setPeriodicidadeSeguro] = useState<Periodicity>('annual');
  const [premioSeguro, setPremioSeguro] = useState<string>('4000');
  const [custosManutencao, setCustosManutencao] = useState<Cost[]>([{id: 1, valor: 20000, periodicity: 'annual'}]);
  const [valorVeiculo, setValorVeiculo] = useState<string>('15000');

  // Jornada de trabalho
  const [distanciaPercorrida, setDistanciaPercorrida] = useState<string>('250');
  const [periodicidadeDistancia, setPeriodicidadeDistancia] = useState<Periodicity>('daily');
  const [horasPorDia, setHorasPorDia] = useState<string>('8');
  const [diasPorSemana, setDiasPorSemana] = useState<string>('5');

  // Dados da corrida
  const [valorCorrida, setValorCorrida] = useState<string>('15');
  const [distanciaCorrida, setDistanciaCorrida] = useState<string>('10');
  const [tempoCorrida, setTempoCorrida] = useState<string>('30');

  // Resultados
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState<number | null>(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('pt');

  const t = translations[language];

  // Funções auxiliares
  const formatNumberInput = (value: string): string => {
    return value.replace(/[^0-9.,]/g, '').replace(',', '.').replace(/(\..*)\./g, '$1');
  };

  const parseInput = (value: string): number => {
    const formattedValue = formatNumberInput(value);
    return formattedValue === '' || isNaN(parseFloat(formattedValue)) ? 0 : parseFloat(formattedValue);
  };

  const handleNumberInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(formatNumberInput(value));
  };

  const handleHorasPorDia = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ''));
    if (!isNaN(num) && num >= 1 && num <= 16) {
      setHorasPorDia(num.toString());
    }
  };

  const handleDiasPorSemana = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ''));
    if (!isNaN(num) && num >= 1 && num <= 7) {
      setDiasPorSemana(num.toString());
    }
  };

  // Cálculos principais
  useEffect(() => {
    // 1. Cálculo de curto prazo (apenas combustível)
    const custoCombustivelPorKm = parseInput(kmPorLitro) > 0 ? parseInput(precoCombustivel) / parseInput(kmPorLitro) : 0;
    const custoCombustivelCorrida = custoCombustivelPorKm * parseInput(distanciaCorrida);
    setLucroCurtoPrazo(parseInput(valorCorrida) - custoCombustivelCorrida);

    // 2. Cálculo de longo prazo
    const converterParaAnual = (valor: number, periodicidade: Periodicity) => {
      const diasUteisAno = 252 * (parseInput(diasPorSemana) / 5);
      const fatorHoras = parseInput(horasPorDia) / 8;
      
      switch(periodicidade) {
        case 'monthly': return valor * 12;
        case 'weekly': return valor * (252 / parseInput(diasPorSemana)) * 7;
        case 'daily': return valor * diasUteisAno * fatorHoras;
        default: return valor;
      }
    };

    const distanciaAnual = converterParaAnual(parseInput(distanciaPercorrida), periodicidadeDistancia);
    const minutosTrabalhadosAno = parseInput(horasPorDia) * 60 * parseInput(diasPorSemana) * 252 / 5;

    const custosAnuais = custosManutencao.map(c => converterParaAnual(c.valor, c.periodicity));
    const seguroAnual = converterParaAnual(parseInput(valorSeguro), periodicidadeSeguro);
    const premioAnual = parseInput(premioSeguro);

    const fatorDistancia = distanciaAnual > 0 ? parseInput(distanciaCorrida) / distanciaAnual : 0;
    const fatorTempo = minutosTrabalhadosAno > 0 ? parseInput(tempoCorrida) / minutosTrabalhadosAno : 0;

    const custoManutencaoCorrida = custosAnuais.reduce((a, b) => a + b, 0) * fatorTempo ;
    const custoSeguroCorrida = seguroAnual * fatorTempo;
    const depreciacaoCorrida = parseInput(valorVeiculo) * 0.0333 * fatorTempo;
    const riscoCorrida = premioAnual * 0.1;

    setLucroLongoPrazo(
      parseInput(valorCorrida) - 
      custoCombustivelCorrida - 
      custoManutencaoCorrida - 
      custoSeguroCorrida - 
      depreciacaoCorrida - 
      riscoCorrida
    );
  }, [
    precoCombustivel, kmPorLitro, valorSeguro, periodicidadeSeguro, premioSeguro,
    custosManutencao, valorVeiculo, distanciaPercorrida, periodicidadeDistancia,
    horasPorDia, diasPorSemana, valorCorrida, distanciaCorrida, tempoCorrida
  ]);

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
      custo.id === id ? {...custo, [field]: field === 'valor' ? parseInput(value) : value} : custo
    ));
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '20px', 
      backgroundColor: '#000', 
      color: '#fff',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Seletor de idioma */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#0f0',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {Object.keys(translations).map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Cabeçalho */}
      <img src="./logo.png" alt="Logo" style={{ width: '150px', marginBottom: '10px' }} />
      <h1 style={{ color: '#0f0', marginBottom: '5px', fontSize: '24px' }}>{t.title}</h1>
      <h2 style={{ color: '#0f0', fontSize: '16px', marginBottom: '20px' }}>{t.subtitle}</h2>

      {/* Botão de configuração */}
      <button
        onClick={() => setShowModal(!showModal)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0f0',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '16px'
        }}
      >
        {showModal ? t.closeButton : t.registerButton}
      </button>

      {/* Modal de configuração */}
      {showModal && (
        <div style={{
          backgroundColor: '#222',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
        }}>
          <h3 style={{ color: '#0f0', marginTop: 0 }}>{t.registerButton}</h3>
          
          {/* Seção de combustível */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.fuelPrice}</label>
            <input 
              type="text" 
              value={precoCombustivel} 
              onChange={(e) => handleNumberInput(e.target.value, setPrecoCombustivel)} 
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #0f0',
                backgroundColor: '#111',
                color: '#fff'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.fuelEfficiency}</label>
            <input 
              type="text" 
              value={kmPorLitro} 
              onChange={(e) => handleNumberInput(e.target.value, setKmPorLitro)} 
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #0f0',
                backgroundColor: '#111',
                color: '#fff'
              }}
            />
          </div>

          {/* Seção de seguro */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.insuranceValue}</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={valorSeguro} 
                onChange={(e) => handleNumberInput(e.target.value, setValorSeguro)} 
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #0f0',
                  backgroundColor: '#111',
                  color: '#fff'
                }}
              />
              <select
                value={periodicidadeSeguro}
                onChange={(e) => setPeriodicidadeSeguro(e.target.value as Periodicity)}
                style={{
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #0f0',
                  backgroundColor: '#111',
                  color: '#fff',
                  minWidth: '100px'
                }}
              >
                {Object.entries(t.periodicityOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.insurancePremium}</label>
            <input 
              type="text" 
              value={premioSeguro} 
              onChange={(e) => handleNumberInput(e.target.value, setPremioSeguro)} 
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #0f0',
                backgroundColor: '#111',
                color: '#fff'
              }}
            />
          </div>

          {/* Seção de custos de manutenção */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.maintenanceCosts}</label>
            {custosManutencao.map((custo) => (
              <div key={custo.id} style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={custo.valor} 
                  onChange={(e) => atualizarCustoManutencao(custo.id, 'valor', e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #0f0',
                    backgroundColor: '#111',
                    color: '#fff'
                  }}
                />
                <select
                  value={custo.periodicity}
                  onChange={(e) => atualizarCustoManutencao(custo.id, 'periodicity', e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #0f0',
                    backgroundColor: '#111',
                    color: '#fff',
                    minWidth: '100px'
                  }}
                >
                  {Object.entries(t.periodicityOptions).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                {custosManutencao.length > 1 && (
                  <button
                    onClick={() => removerCustoManutencao(custo.id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#f00',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    {t.remove}
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={adicionarCustoManutencao}
              style={{
                padding: '8px 12px',
                backgroundColor: '#0f0',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '5px'
              }}
            >
              {t.addCost}
            </button>
          </div>

          {/* Seção de jornada de trabalho */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.distance}</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={distanciaPercorrida} 
                onChange={(e) => handleNumberInput(e.target.value, setDistanciaPercorrida)} 
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #0f0',
                  backgroundColor: '#111',
                  color: '#fff'
                }}
              />
              <select
                value={periodicidadeDistancia}
                onChange={(e) => setPeriodicidadeDistancia(e.target.value as Periodicity)}
                style={{
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #0f0',
                  backgroundColor: '#111',
                  color: '#fff',
                  minWidth: '100px'
                }}
              >
                {Object.entries(t.periodicityOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.workingHours}</label>
            <input 
              type="number"
              min="1"
              max="16"
              value={horasPorDia} 
              onChange={(e) => handleHorasPorDia(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #0f0',
                backgroundColor: '#111',
                color: '#fff'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.workingDays}</label>
            <input 
              type="number"
              min="1"
              max="7"
              value={diasPorSemana} 
              onChange={(e) => handleDiasPorSemana(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #0f0',
                backgroundColor: '#111',
                color: '#fff'
              }}
            />
          </div>

          {/* Seção de valor do veículo */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.vehicleValue}</label>
            <input 
              type="text" 
              value={valorVeiculo} 
              onChange={(e) => handleNumberInput(e.target.value, setValorVeiculo)} 
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #0f0',
                backgroundColor: '#111',
                color: '#fff'
              }}
            />
          </div>

          <button
            onClick={() => setShowModal(false)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0f0',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            {t.saveButton}
          </button>
        </div>
      )}

      {/* Seção de dados da corrida */}
      <div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
      }}>
        <h3 style={{ color: '#0f0', marginTop: 0, marginBottom: '15px' }}>Dados da Corrida</h3>
        
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>{t.rideValue}</label>
          <input 
            type="text" 
            value={valorCorrida} 
            onChange={(e) => handleNumberInput(e.target.value, setValorCorrida)} 
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #0f0',
              backgroundColor: '#111',
              color: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>{t.rideDistance}</label>
          <input 
            type="text" 
            value={distanciaCorrida} 
            onChange={(e) => handleNumberInput(e.target.value, setDistanciaCorrida)} 
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #0f0',
              backgroundColor: '#111',
              color: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>{t.rideTime}</label>
          <input 
            type="text" 
            value={tempoCorrida} 
            onChange={(e) => handleNumberInput(e.target.value, setTempoCorrida)} 
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #0f0',
              backgroundColor: '#111',
              color: '#fff'
            }}
          />
        </div>
      </div>

      {/* Resultados */}
      <div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
      }}>
        <h3 style={{ color: '#0f0', marginTop: 0, marginBottom: '15px' }}>Resultados</h3>
        
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#0f0' }}>{t.shortTermProfit}</label>
          <div style={{
            padding: '12px',
            backgroundColor: '#0f0',
            color: '#000',
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '18px',
            textAlign: 'center'
          }}>
            {lucroCurtoPrazo !== null ? `R$ ${lucroCurtoPrazo.toFixed(2)}` : '---'}
          </div>
        </div>

        <div style={{ textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#0f0' }}>{t.longTermProfit}</label>
          <div style={{
            padding: '12px',
            backgroundColor: '#0f0',
            color: '#000',
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '18px',
            textAlign: 'center'
          }}>
            {lucroLongoPrazo !== null ? `R$ ${lucroLongoPrazo.toFixed(2)}` : '---'}
          </div>
        </div>
      </div>

      {/* Dicas e informações */}
      <div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
        textAlign: 'left'
      }}>
        <h3 style={{ color: '#0f0', marginTop: 0, marginBottom: '15px' }}>{t.tips}</h3>
        <p style={{ marginBottom: '10px' }}>{t.tip1}</p>
        <p style={{ marginBottom: '10px' }}>{t.tip2}</p>
        <p style={{ marginBottom: '10px', fontStyle: 'italic' }}>{t.formula}</p>
        <div dangerouslySetInnerHTML={{ __html: t.community }} style={{ marginTop: '15px' }} />
      </div>
    </div>
  );
}
