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
    // ... (mantenha o conteúdo em português existente) ...
  },
  en: {
    // ... (mantenha o conteúdo em inglês existente) ...
  },
  fr: {
    // ... (mantenha o conteúdo em francês existente) ...
  },
  zh: {
    // ... (mantenha o conteúdo em chinês existente) ...
  },
  ja: {
    // ... (mantenha o conteúdo em japonês existente) ...
  },
  ar: { // Árabe
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
  de: { // Alemão
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
  ru: { // Russo
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
  uk: { // Ucraniano
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
  da: { // Dinamarquês
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
  tr: { // Turco
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
  sw: { // Swahili (África Oriental)
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

// ... (mantenha o resto do código existente, incluindo o componente CalculoLucro) ...

// Atualize o seletor de idiomas para incluir as novas opções
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
  <option value="ar">ع</option>  {/* Árabe - ع */}
  <option value="de">DE</option> {/* Alemão - DE */}
  <option value="ru">RU</option> {/* Russo - RU */}
  <option value="uk">УК</option> {/* Ucraniano - УК */}
  <option value="da">DK</option> {/* Dinamarquês - DK */}
  <option value="tr">TR</option> {/* Turco - TR */}
  <option value="sw">SW</option> {/* Swahili - SW */}
</select>

export default function CalculoLucro() {
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

  const t = translations[language];

  useEffect(() => {
    calcularLucros();
  }, [precoCombustivel, kmPorLitro, valorSeguro, periodicidadeSeguro, premioSeguro, custosManutencao, distanciaPercorrida, periodicidadeDistancia, valorVeiculo, valorCorrida, KmRodados]);

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
              </select>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.insurancePremium}</label>
            <input 
              type="number" 
              value={premioSeguro} 
              onChange={(e) => setPremioSeguro(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
              min="0"
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.maintenanceCosts}</label>
            {custosManutencao.map((custo) => (
              <div key={custo.id} style={{marginBottom: '10px'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                  <input 
                    type="number" 
                    value={custo.valor} 
                    onChange={(e) => atualizarCustoManutencao(custo.id, 'valor', parseFloat(e.target.value))} 
                    style={{ flex: 1, padding: '5px' }}
                    min="0"
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
                type="number" 
                value={distanciaPercorrida} 
                onChange={(e) => setDistanciaPercorrida(parseFloat(e.target.value) || 0)} 
                style={{ flex: 1, padding: '5px' }}
                min="0"
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
          
          <div style={{ marginBottom: '15px' }}>
            <label>{t.vehicleValue}</label>
            <input 
              type="number" 
              value={valorVeiculo} 
              onChange={(e) => setValorVeiculo(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
              min="0"
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
          type="number" 
          value={valorCorrida} 
          onChange={(e) => setValorCorrida(parseFloat(e.target.value) || 0)} 
          style={{ marginLeft: '10px', padding: '5px' }}
          min="0"
        />
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <label>{t.rideDistance}</label>
        <input 
          type="number" 
          value={KmRodados} 
          onChange={(e) => setKmRodados(parseFloat(e.target.value) || 0)} 
          style={{ marginLeft: '10px', padding: '5px' }}
          min="0"
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
        {t.tip2}<br /><br />
        
        <strong style={{ color: '#0f0' }}>{t.formula}</strong> {t.rideValue} - {t.fuelPrice} - {t.maintenanceCosts} - {t.insuranceValue} - {t.insurancePremium} * 10% - {t.vehicleValue} * 3.33%
        <br /><br />
        {t.community}
      </p>
    </div>
  );
}
