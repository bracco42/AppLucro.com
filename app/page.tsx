'use client';

import React, { useState, useEffect } from 'react';

type Periodicity = 'annual' | 'monthly' | 'daily' | 'weekly';

type Cost = {
  id: number;
  descricao: string;
  valor: number;
  periodicity: Periodicity;
};

type Language = 'pt' | 'en';

type CalculationHistory = {
  id: string;
  shortTerm: number;
  longTerm: number;
  rideMinutes: number;
  rideValue: number;
  rideDistance: number;
  fuelCost: number;
  maintenanceCost: number;
  insuranceCost: number;
  depreciation: number;
  riskCost: number;
  timestamp: Date;
};

const translations = {
  'pt': {
    title: 'Lucros de Corridas (Todas Plataformas/Veículos)',
    subtitle: 'Destinado à tomada de decisões de curto e longo prazo',
    registerButton: 'Cadastrar Dados do Veículo',
    closeButton: 'Fechar Cadastro',
    saveButton: 'Salvar',
    resetButton: 'Resetar',
    exportButton: 'Exportar Config',
    importButton: 'Importar Config',
    fuelPrice: 'Preço do Combustível por Litro:',
    fuelEfficiency: 'Distância Percorrida por Litro (km/L):',
    insuranceValue: 'Valor do Seguro:',
    insurancePremium: 'Prêmio do Seguro:',
    maintenanceCosts: 'Custos de Manutenção:',
    addCost: 'Adicionar Custo',
    remove: 'Remover',
    timeSpent: 'Tempo trabalhado:',
    workingHours: 'Horas dirigidas/dia (1-16):',
    workingDays: 'Dias/semana (1-7):',
    vehicleValue: 'Valor Atual do Veículo:',
    rideValue: 'Valor Pago:',
    rideDistance: 'Distância Percorrida (Km) Total na Ida/Volta:',
    rideTime: 'Tempo da Corrida Total desde encerramento da última (em minutos):',
    shortTermProfit: 'Lucro de Curto Prazo:',
    longTermProfit: 'Lucro de Longo Prazo:',
    tips: 'Dicas:',
    tip1: 'Levar espera em consideração no tempo gasto. Se você aluga o veículo, deixe o valor do veículo como zero e inclua o valor do aluguel nos custos de manutenção.',
    tip2: 'Pode ser usado em todas as plataformas e veículos! Para todos os motoristas, tanto aplicativos (Ifood, Uber, 99, etc.) quanto taxi, vans e até ônibus/avião/metrô (demanda criatividade).',
    formula: 'Fórmula do Lucro de Longo Prazo: Receita - Despesas (Combustível e Outros) - Depreciação (3.33% * Valor do Veículo por ano) - Risco (10% * Prêmio do Seguro por ano). Obs.: lucro de curto prazo desconta somente combustível da corrida.',
    importError: 'Erro ao importar configurações',
    history: 'Histórico de Cálculos',
    saveCalculation: 'Salvar Cálculo',
    clearHistory: 'Limpar Histórico',
    costDescription: 'Descrição do Custo',
    costValue: 'Valor',
    costPeriodicity: 'Periodicidade',
    calculationTime: 'Data/Hora',
    profitShort: 'Lucro Curto',
    profitLong: 'Lucro Longo',
    actions: 'Ações',
    rideMinutes: 'Minutos',
    rideValueHistory: 'Valor',
    rideDistanceHistory: 'Distância',
    delete: 'Excluir',
    details: 'Detalhes',
    noHistory: 'Nenhum cálculo no histórico',
    calculationDetails: 'Detalhes do Cálculo',
    closeDetails: 'Fechar Detalhes',
    fuelCost: 'Custo Combustível',
    maintenanceCost: 'Custo Manutenção',
    insuranceCost: 'Custo Seguro',
    depreciation: 'Depreciação',
    riskCost: 'Custo Risco',
    totalCosts: 'Custos Totais',
    netProfit: 'Lucro Líquido',
    defaultCosts: [
      { id: 1, descricao: 'Taxa (IPVA/Impostos)', valor: 0, periodicity: 'annual' as Periodicity },
      { id: 2, descricao: 'Óleo', valor: 0, periodicity: 'annual' as Periodicity }
    ],
    periodicityOptions: {
      annual: 'Anual',
      monthly: 'Mensal',
      weekly: 'Semanal',
      daily: 'Diário'
    }
  },
  'en': {
    title: 'Ride Profits Calculator (All Platforms/Vehicles)',
    subtitle: 'For short and long term decision making',
    registerButton: 'Register Vehicle Data',
    closeButton: 'Close Registration',
    saveButton: 'Save',
    resetButton: 'Reset',
    exportButton: 'Export Settings',
    importButton: 'Import Settings',
    fuelPrice: 'Fuel Price per Liter:',
    fuelEfficiency: 'Distance per Liter (km/L or mi/L):',
    insuranceValue: 'Insurance Value:',
    insurancePremium: 'Insurance Premium:',
    maintenanceCosts: 'Maintenance Costs:',
    addCost: 'Add Cost',
    remove: 'Remove',
    timeSpent: 'Time worked:',
    workingHours: 'Driving hours/day (1-16):',
    workingDays: 'Days/week (1-7):',
    vehicleValue: 'Current Vehicle Value:',
    rideValue: 'Paid Value:',
    rideDistance: 'Actual Distance (Km or Mi) Riden Going/Returning;',
    rideTime: 'Ride Total Time Since The End of The Last One (in minutes):',
    shortTermProfit: 'Short Term Profit:',
    longTermProfit: 'Long Term Profit:',
    tips: 'Tips:',
    tip1: 'Consider waiting time in time spent. If you rent the vehicle, set the vehicle value to zero and include the rental value in maintenance costs.',
    tip2: 'Can be used for all platforms and vehicles! For all drivers, app-based (Ifood, Uber, 99, etc.), taxis, vans and even buses/planes/subways (requires creativity).',
    formula: 'Long Term Profit Formula: Revenue - Expenses (Fuel and Others) - Depreciation (3.33% * Vehicle Value per year) - Risk (10% * Insurance Premium per year). Note: short term profit only deducts ride fuel cost.',
    importError: 'Error importing settings',
    history: 'Calculation History',
    saveCalculation: 'Save Calculation',
    clearHistory: 'Clear History',
    costDescription: 'Cost Description',
    costValue: 'Value',
    costPeriodicity: 'Periodicity',
    calculationTime: 'Date/Time',
    profitShort: 'Short Profit',
    profitLong: 'Long Profit',
    actions: 'Actions',
    rideMinutes: 'Minutes',
    rideValueHistory: 'Value',
    rideDistanceHistory: 'Distance',
    delete: 'Delete',
    details: 'Details',
    noHistory: 'No calculations in history',
    calculationDetails: 'Calculation Details',
    closeDetails: 'Close Details',
    fuelCost: 'Fuel Cost',
    maintenanceCost: 'Maintenance Cost',
    insuranceCost: 'Insurance Cost',
    depreciation: 'Depreciation',
    riskCost: 'Risk Cost',
    totalCosts: 'Total Costs',
    netProfit: 'Net Profit',
    defaultCosts: [
      { id: 1, descricao: 'Tax', valor: 0, periodicity: 'annual' as Periodicity },
      { id: 2, descricao: 'Oil', valor: 0, periodicity: 'annual' as Periodicity }
    ],
    periodicityOptions: {
      annual: 'Annual',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily'
    }
  }
};

const STORAGE_KEY = 'rideProfitCalculatorSettings';
const HISTORY_KEY = 'rideProfitCalculationHistory';

const isValidSettings = (data: any): boolean => {
  try {
    if (!data || typeof data !== 'object') return false;
    return ('fuelPrice' in data || 'precoCombustivel' in data) &&
           ('kmPorLitro' in data || 'fuelEfficiency' in data);
  } catch {
    return false;
  }
};

export default function CalculoLucro() {
  const [precoCombustivel, setPrecoCombustivel] = useState<string>('');
  const [kmPorLitro, setKmPorLitro] = useState<string>('');
  const [valorSeguro, setValorSeguro] = useState<string>('');
  const [periodicidadeSeguro, setPeriodicidadeSeguro] = useState<Periodicity>('annual');
  const [premioSeguro, setPremioSeguro] = useState<string>('');
  const [language, setLanguage] = useState<Language>('pt');
  const [custosManutencao, setCustosManutencao] = useState<Cost[]>(translations['pt'].defaultCosts);
  const [valorVeiculo, setValorVeiculo] = useState<string>('');
  const [horasPorDia, setHorasPorDia] = useState<string>('');
  const [diasPorSemana, setDiasPorSemana] = useState<string>('');
  const [valorCorrida, setValorCorrida] = useState<string>('');
  const [distanciaCorrida, setDistanciaCorrida] = useState<string>('');
  const [tempoCorrida, setTempoCorrida] = useState<string>('');
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState<number | null>(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<CalculationHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCalculation, setSelectedCalculation] = useState<CalculationHistory | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const t = translations[language];

  useEffect(() => {
    const handleError = (err: ErrorEvent) => {
      console.error('Global error:', err);
      setError(language === 'pt' ? 'Ocorreu um erro. Por favor, recarregue a página.' : 'An error occurred. Please reload the page.');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        if (isValidSettings(parsedSettings)) {
          setPrecoCombustivel(parsedSettings.fuelPrice || parsedSettings.precoCombustivel || '');
          setKmPorLitro(parsedSettings.kmPorLitro || parsedSettings.fuelEfficiency || '');
          setValorSeguro(parsedSettings.valorSeguro || parsedSettings.insuranceValue || '');
          setPeriodicidadeSeguro(parsedSettings.periodicidadeSeguro || 'annual');
          setPremioSeguro(parsedSettings.premioSeguro || parsedSettings.insurancePremium || '');
          
          if (Array.isArray(parsedSettings.custosManutencao) || Array.isArray(parsedSettings.maintenanceCosts)) {
            const costs = parsedSettings.custosManutencao || parsedSettings.maintenanceCosts;
            setCustosManutencao(costs.map((c: any) => ({
              id: c.id || Date.now(),
              descricao: c.descricao || c.description || (language === 'pt' ? `Custo ${c.id || Date.now()}` : `Cost ${c.id || Date.now()}`),
              valor: typeof c.valor === 'number' ? c.valor : (typeof c.value === 'number' ? c.value : 0),
              periodicity: ['annual', 'monthly', 'weekly', 'daily'].includes(c.periodicity) 
                ? c.periodicity 
                : 'annual'
            })));
          }
          
          setValorVeiculo(parsedSettings.valorVeiculo || parsedSettings.vehicleValue || '');
          setHorasPorDia(parsedSettings.horasPorDia || parsedSettings.workingHours || '');
          setDiasPorSemana(parsedSettings.diasPorSemana || parsedSettings.workingDays || '');
          setLanguage(['pt', 'en'].includes(parsedSettings.language) ? parsedSettings.language : 'pt');
        }
      }

      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            setCalculationHistory(parsedHistory.map((item: any) => ({
              id: item.id || Date.now().toString(),
              shortTerm: typeof item.shortTerm === 'number' ? item.shortTerm : 0,
              longTerm: typeof item.longTerm === 'number' ? item.longTerm : 0,
              rideMinutes: item.rideMinutes || 0,
              rideValue: item.rideValue || 0,
              rideDistance: item.rideDistance || 0,
              fuelCost: item.fuelCost || 0,
              maintenanceCost: item.maintenanceCost || 0,
              insuranceCost: item.insuranceCost || 0,
              depreciation: item.depreciation || 0,
              riskCost: item.riskCost || 0,
              timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
            })));
          }
        } catch (e) {
          console.error('Error parsing history:', e);
        }
      }
    } catch (e) {
      console.error('Error loading data:', e);
    }
  }, [language]);

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
    } else if (value === '') {
      setHorasPorDia('');
    }
  };

  const handleDiasPorSemana = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ''));
    if (!isNaN(num) && num >= 1 && num <= 7) {
      setDiasPorSemana(num.toString());
    } else if (value === '') {
      setDiasPorSemana('');
    }
  };

  useEffect(() => {
    if (!precoCombustivel || !kmPorLitro || !valorCorrida || !distanciaCorrida || !tempoCorrida) {
      setLucroCurtoPrazo(null);
      setLucroLongoPrazo(null);
      return;
    }

    const custoCombustivelPorKm = parseInput(kmPorLitro) > 0 ? parseInput(precoCombustivel) / parseInput(kmPorLitro) : 0;
    const custoCombustivelCorrida = custoCombustivelPorKm * parseInput(distanciaCorrida);
    const shortTerm = parseInput(valorCorrida) - custoCombustivelCorrida;
    setLucroCurtoPrazo(isNaN(shortTerm) ? null : shortTerm);

    const daysPerWeek = parseInput(diasPorSemana) || 5;
    const hoursPerDay = parseInput(horasPorDia) || 8;
    const minutosTrabalhadosAno = hoursPerDay * 60 * daysPerWeek * 252 / 5;

    const custosAnuais = custosManutencao.map(c => {
      switch(c.periodicity) {
        case 'monthly': 
          return c.valor * 12;
        case 'weekly': 
          return c.valor * (252 / daysPerWeek);
        case 'daily': 
          return c.valor * (252 * daysPerWeek / 5 * hoursPerDay / 8);
        default: 
          return c.valor;
      }
    });

    const seguroAnual = (() => {
      switch(periodicidadeSeguro) {
        case 'monthly': 
          return parseInput(valorSeguro) * 12;
        case 'weekly': 
          return parseInput(valorSeguro) * (252 / daysPerWeek);
        case 'daily': 
          return parseInput(valorSeguro) * (252 * daysPerWeek / 5 * hoursPerDay / 8);
        default: 
          return parseInput(valorSeguro);
      }
    })();

    const premioAnual = parseInput(premioSeguro);
    const fatorTempo = minutosTrabalhadosAno > 0 ? parseInput(tempoCorrida) / minutosTrabalhadosAno : 0;

    const custoManutencaoCorrida = custosAnuais.reduce((a, b) => a + b, 0) * fatorTempo;
    const custoSeguroCorrida = seguroAnual * fatorTempo;
    const depreciacaoCorrida = parseInput(valorVeiculo) * 0.0333 * fatorTempo;
    const riscoCorrida = premioAnual * 0.1 * fatorTempo;

    const longTerm = parseInput(valorCorrida) - 
      custoCombustivelCorrida - 
      custoManutencaoCorrida - 
      custoSeguroCorrida - 
      depreciacaoCorrida - 
      riscoCorrida;
      
    setLucroLongoPrazo(isNaN(longTerm) ? null : longTerm);
  }, [
    precoCombustivel, kmPorLitro, valorSeguro, periodicidadeSeguro, premioSeguro,
    custosManutencao, valorVeiculo, horasPorDia, diasPorSemana, 
    valorCorrida, distanciaCorrida, tempoCorrida
  ]);

  const saveSettings = () => {
    const settingsToSave = {
      fuelPrice: precoCombustivel,
      kmPorLitro,
      valorSeguro,
      periodicidadeSeguro,
      premioSeguro,
      custosManutencao,
      valorVeiculo,
      horasPorDia,
      diasPorSemana,
      language
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
    setShowModal(false);
  };

  const resetSettings = () => {
    if (confirm(t.resetButton + '?')) {
      localStorage.removeItem(STORAGE_KEY);
      setPrecoCombustivel('');
      setKmPorLitro('');
      setValorSeguro('');
      setPeriodicidadeSeguro('annual');
      setPremioSeguro('');
      setCustosManutencao(translations[language].defaultCosts);
      setValorVeiculo('');
      setHorasPorDia('');
      setDiasPorSemana('');
    }
  };

  const exportSettings = async () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEY);
      if (!settings) return;

      const blob = new Blob([settings], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ride_profit_settings.json';
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Error exporting settings:', error);
      alert('Failed to export settings');
    }
  };
  
  const importSettings = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const settings = JSON.parse(event.target?.result as string);
            if (!isValidSettings(settings)) {
              alert(t.importError);
              return;
            }
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            window.location.reload();
          } catch (error) {
            alert(t.importError);
          }
        };
        reader.onerror = () => {
          alert(t.importError);
        };
        reader.readAsText(file);
      };
      
      document.body.appendChild(input);
      input.click();
      
      setTimeout(() => {
        document.body.removeChild(input);
      }, 100);
    } catch (error) {
      console.error('Error importing settings:', error);
      alert(t.importError);
    }
  };

  const saveCalculation = () => {
    if (lucroCurtoPrazo === null || lucroLongoPrazo === null || !tempoCorrida || !valorCorrida || !distanciaCorrida) return;

    const custoCombustivelPorKm = parseInput(kmPorLitro) > 0 ? parseInput(precoCombustivel) / parseInput(kmPorLitro) : 0;
    const custoCombustivelCorrida = custoCombustivelPorKm * parseInput(distanciaCorrida);

    const daysPerWeek = parseInput(diasPorSemana) || 5;
    const hoursPerDay = parseInput(horasPorDia) || 8;
    const minutosTrabalhadosAno = hoursPerDay * 60 * daysPerWeek * 252 / 5;
    const fatorTempo = minutosTrabalhadosAno > 0 ? parseInput(tempoCorrida) / minutosTrabalhadosAno : 0;

    const custosAnuais = custosManutencao.map(c => {
      switch(c.periodicity) {
        case 'monthly': return c.valor * 12;
        case 'weekly': return c.valor * (252 / daysPerWeek);
        case 'daily': return c.valor * (252 * daysPerWeek / 5 * hoursPerDay / 8);
        default: return c.valor;
      }
    });

    const seguroAnual = (() => {
      switch(periodicidadeSeguro) {
        case 'monthly': return parseInput(valorSeguro) * 12;
        case 'weekly': return parseInput(valorSeguro) * (252 / daysPerWeek);
        case 'daily': return parseInput(valorSeguro) * (252 * daysPerWeek / 5 * hoursPerDay / 8);
        default: return parseInput(valorSeguro);
      }
    })();

    const premioAnual = parseInput(premioSeguro);
    const custoManutencaoCorrida = custosAnuais.reduce((a, b) => a + b, 0) * fatorTempo;
    const custoSeguroCorrida = seguroAnual * fatorTempo;
    const depreciacaoCorrida = parseInput(valorVeiculo) * 0.0333 * fatorTempo;
    const riscoCorrida = premioAnual * 0.1 * fatorTempo;

    const newHistory = [
      {
        id: Date.now().toString(),
        shortTerm: lucroCurtoPrazo,
        longTerm: lucroLongoPrazo,
        rideMinutes: parseInput(tempoCorrida),
        rideValue: parseInput(valorCorrida),
        rideDistance: parseInput(distanciaCorrida),
        fuelCost: custoCombustivelCorrida,
        maintenanceCost: custoManutencaoCorrida,
        insuranceCost: custoSeguroCorrida,
        depreciation: depreciacaoCorrida,
        riskCost: riscoCorrida,
        timestamp: new Date()
      },
      ...calculationHistory
    ].slice(0, 20);

    setCalculationHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    if (confirm(language === 'pt' ? 'Limpar todo o histórico de cálculos?' : 'Clear all calculation history?')) {
      setCalculationHistory([]);
      localStorage.removeItem(HISTORY_KEY);
    }
  };

  const deleteCalculation = (id: string) => {
    if (confirm(language === 'pt' ? 'Excluir este cálculo?' : 'Delete this calculation?')) {
      const updatedHistory = calculationHistory.filter(item => item.id !== id);
      setCalculationHistory(updatedHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    }
  };

  const showCalculationDetails = (calc: CalculationHistory) => {
    setSelectedCalculation(calc);
    setShowDetails(true);
  };

  const adicionarCustoManutencao = () => {
    setCustosManutencao([...custosManutencao, {id: Date.now(), descricao: '', valor: 0, periodicity: 'annual'}]);
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
      {error && (
        <div style={{ color: 'red', padding: '20px', background: '#ffecec' }}>
          {error}
        </div>
      )}

      <img 
        src="/logo.svg" 
        alt="Logo" 
        style={{ 
          width: '166px',
          height: 'auto',
          marginBottom: '20px' 
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }} 
      />

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

      <h1 style={{ color: '#0f0', marginBottom: '5px', fontSize: '24px' }}>{t.title}</h1>
      <h2 style={{ color: '#0f0', fontSize: '16px', marginBottom: '20px' }}>{t.subtitle}</h2>

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

      {showModal && (
        <div style={{
          backgroundColor: '#222',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
        }}>
          <h3 style={{ color: '#0f0', marginTop: 0 }}>{t.registerButton}</h3>
          
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

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{t.maintenanceCosts}</label>
            {custosManutencao.map((custo) => (
              <div 
                key={custo.id} 
                style={{ 
                  marginBottom: '10px', 
                  display: 'flex', 
                  flexDirection: 'row', 
                  flexWrap: 'wrap',
                  gap: '10px', 
                  alignItems: 'center' 
                }}
              >
                <input
                  type="text"
                  value={custo.descricao}
                  onChange={(e) => atualizarCustoManutencao(custo.id, 'descricao', e.target.value)}
                  placeholder={t.costDescription}
                  style={{
                    flex: '1 1 150px',
                    minWidth: '120px',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #0f0',
                    backgroundColor: '#111',
                    color: '#fff'
                  }}
                />
                <input 
                  type="text" 
                  value={custo.valor} 
                  onChange={(e) => atualizarCustoManutencao(custo.id, 'valor', e.target.value)}
                  placeholder={t.costValue}
                  style={{
                    flex: '0 1 100px',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #0f0',
                    backgroundColor: '#111',
                    color: '#fff'
                  }}
                />
                <select
                  value={custo.periodicity}
                  onChange={(e) => atualizarCustoManutencao(custo.id, 'periodicity', e.target.value as Periodicity)}
                  style={{
                    flex: '0 1 120px',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #0f0',
                    backgroundColor: '#111',
                    color: '#fff'
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
                      flex: '0 0 auto',
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

          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button
              onClick={saveSettings}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#0f0',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {t.saveButton}
            </button>
            <button
              onClick={resetSettings}
              style={{
                padding: '12px',
                backgroundColor: '#f00',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {t.resetButton}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={exportSettings}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#00f',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {t.exportButton}
            </button>
            <button
              onClick={importSettings}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#00f',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {t.importButton}
            </button>
          </div>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
      }}>
        <h3 style={{ color: '#0f0', marginTop: 0, marginBottom: '15px' }}>{language === 'pt' ? 'Dados da Corrida' : 'Ride Data'}</h3>
        
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

      <div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
      }}>
        <h3 style={{ color: '#0f0', marginTop: 0, marginBottom: '15px' }}>{language === 'pt' ? 'Resultados' : 'Results'}</h3>
        
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
            {lucroCurtoPrazo !== null ? `$ ${lucroCurtoPrazo.toFixed(2)}` : '-'}
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
            {lucroLongoPrazo !== null ? `$ ${lucroLongoPrazo.toFixed(2)}` : '-'}
          </div>
        </div>

        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          <button
            onClick={saveCalculation}
            disabled={lucroCurtoPrazo === null || lucroLongoPrazo === null}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#0f0',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              opacity: (lucroCurtoPrazo === null || lucroLongoPrazo === null) ? 0.5 : 1
            }}
          >
            {t.saveCalculation}
          </button>
        </div>
      </div>

      {calculationHistory.length > 0 ? (
        <div style={{ 
          backgroundColor: '#222', 
          padding: '20px', 
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#0f0', marginTop: 0 }}>{t.history}</h3>
            <button
              onClick={clearHistory}
              style={{
                padding: '8px 12px',
                backgroundColor: '#f00',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {t.clearHistory}
            </button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #0f0' }}>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#0f0' }}>{t.calculationTime}</th>
                  <th style={{ padding: '8px', textAlign: 'right', color: '#0f0' }}>{t.rideMinutes}</th>
                  <th style={{ padding: '8px', textAlign: 'right', color: '#0f0' }}>{t.rideValueHistory}</th>
                  <th style={{ padding: '8px', textAlign: 'right', color: '#0f0' }}>{t.rideDistanceHistory}</th>
                  <th style={{ padding: '8px', textAlign: 'right', color: '#0f0' }}>{t.profitShort}</th>
                  <th style={{ padding: '8px', textAlign: 'right', color: '#0f0' }}>{t.profitLong}</th>
                  <th style={{ padding: '8px', textAlign: 'center', color: '#0f0' }}>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {calculationHistory.map((calc) => (
                  <tr key={calc.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '8px', textAlign: 'left' }}>
                      {calc.timestamp.toLocaleString()}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      {calc.rideMinutes} min
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      $ {calc.rideValue.toFixed(2)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      {calc.rideDistance} km
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      $ {calc.shortTerm.toFixed(2)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      $ {calc.longTerm.toFixed(2)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                      <button
                        onClick={() => showCalculationDetails(calc)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#0f0',
                          color: '#000',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        {t.details}
                      </button>
                      <button
                        onClick={() => deleteCalculation(calc.id)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#f00',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        {t.delete}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: '#222', 
          padding: '20px', 
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
          textAlign: 'center'
        }}>
          <p>{t.noHistory}</p>
        </div>
      )}

      {showDetails && selectedCalculation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#222',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#0f0', margin: 0 }}>{t.calculationDetails}</h3>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f00',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {t.closeDetails}
              </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <p style={{ margin: '5px 0', color: '#0f0' }}>{t.calculationTime}:</p>
              <p>{selectedCalculation.timestamp.toLocaleString()}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <p style={{ margin: '5px 0', color: '#0f0' }}>{t.rideValue}:</p>
                <p>$ {selectedCalculation.rideValue.toFixed(2)}</p>
              </div>
              <div>
                <p style={{ margin: '5px 0', color: '#0f0' }}>{t.rideDistance}:</p>
                <p>{selectedCalculation.rideDistance} km</p>
              </div>
              <div>
                <p style={{ margin: '5px 0', color: '#0f0' }}>{t.rideMinutes}:</p>
                <p>{selectedCalculation.rideMinutes} min</p>
              </div>
            </div>

            <div style={{ margin: '20px 0', borderTop: '1px solid #0f0', paddingTop: '15px' }}>
              <h4 style={{ color: '#0f0', marginBottom: '10px' }}>{t.totalCosts}:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <p style={{ margin: '5px 0', color: '#0f0' }}>{t.fuelCost}:</p>
                  <p>$ {selectedCalculation.fuelCost.toFixed(2)}</p>
                </div>
                <div>
                  <p style={{ margin: '5px 0', color: '#0f0' }}>{t.maintenanceCost}:</p>
                  <p>$ {selectedCalculation.maintenanceCost.toFixed(2)}</p>
                </div>
                <div>
                  <p style={{ margin: '5px 0', color: '#0f0' }}>{t.insuranceCost}:</p>
                  <p>$ {selectedCalculation.insuranceCost.toFixed(2)}</p>
                </div>
                <div>
                  <p style={{ margin: '5px 0', color: '#0f0' }}>{t.depreciation}:</p>
                  <p>$ {selectedCalculation.depreciation.toFixed(2)}</p>
                </div>
                <div>
                  <p style={{ margin: '5px 0', color: '#0f0' }}>{t.riskCost}:</p>
                  <p>$ {selectedCalculation.riskCost.toFixed(2)}</p>
                </div>
                <div>
                  <p style={{ margin: '5px 0', color: '#0f0', fontWeight: 'bold' }}>Total:</p>
                  <p style={{ fontWeight: 'bold' }}>
                    $ {(selectedCalculation.fuelCost + selectedCalculation.maintenanceCost + 
                        selectedCalculation.insuranceCost + selectedCalculation.depreciation + 
                        selectedCalculation.riskCost).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid #0f0', paddingTop: '15px' }}>
              <h4 style={{ color: '#0f0', marginBottom: '10px' }}>{t.netProfit}:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <p style={{ margin: '5px 0', color: '#0f0' }}>{t.shortTermProfit}:</p>
                  <p>$ {selectedCalculation.shortTerm.toFixed(2)}</p>
                </div>
                <div>
                  <p style={{ margin: '5px 0', color: '#0f0' }}>{t.longTermProfit}:</p>
                  <p>$ {selectedCalculation.longTerm.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
<div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
        textAlign: 'left'
      }}>
        <h3 style={{ color: '#0f0', marginTop: 0, marginBottom: '15px' }}>{t.tips}</h3>
      
        <p style={{ marginBottom: '10px' }}>{t.tip2}</p>
        <p style={{ marginBottom: '10px', fontStyle: 'italic' }}>{t.formula}</p>
        <p style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
          {language === 'pt' ? 'OpenSource!!! bernarddinizbracco.live Em Parceria Com: ' : 'OpenSource!!! bernarddinizbracco.live In Partnership With: '}
          <a 
            href="https://instagram.com/famartdistribuidora.petropolis" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#6ec1ff', textDecoration: 'none' }}
          >
            @famartdistribuidora.petropolis
          </a>
          ,<br />
          {language === 'pt' 
            ? 'materiais de construção e tudo mais que você precisar (pinturas, do lar, elétrica, ferragens, hidráulica, ferramentas), com preços que vão te surpreender! Consulte nosso catálogo de vendas também no site ' 
            : 'construction materials and everything else you need (paints, home items, electrical, hardware, plumbing, tools), with prices that will surprise you! Check our sales catalog also on the website '
          }
          <a 
            href="https://comprefamart.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#6ec1ff', textDecoration: 'none' }}
          >
            comprefamart.com.br
          </a>
          .<br />
          {language === 'pt' 
            ? '(Em breve maiores novidades)!' 
            : '(More news coming soon)!'
          }
        </p>
      </div>
    </div>
  );
}
