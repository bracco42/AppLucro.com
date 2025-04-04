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
  shortTerm: number;
  longTerm: number;
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
    fuelEfficiency: 'Distância Percorrida por Litro (Km/L):',
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
    rideDistance: 'Distância da Corrida (km):',
    rideTime: 'Tempo da Corrida (minutos):',
    shortTermProfit: 'Lucro de Curto Prazo:',
    longTermProfit: 'Lucro de Longo Prazo:',
    tips: 'Dicas:',
    tip1: 'Levar espera em consideração no tempo gasto. Se você aluga o veículo, deixe o valor do veículo como zero e inclua o valor do aluguel nos custos de manutenção.',
    tip2: 'Pode ser usado em todas as plataformas e veículos! Para todos os motoristas, tanto aplicativos (Ifood, Uber, 99, etc.) quanto taxi, vans e até ônibus/avião/metrô (demanda criatividade).',
    formula: 'Fórmula do Lucro de Longo Prazo: Receita - Despesas (Combustível e Outros) - Depreciação (3.33% * Valor do Veículo por ano) - Risco (10% * Prêmio do Seguro por ano). Obs.: lucro de curto prazo desconta somente combustível da corrida.',
    community: 'Entre em nossa <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">OpenSource Facebook Community</a>!!!',
    validationMessage: 'Por favor, preencha pelo menos preço do combustível e eficiência',
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
    fuelEfficiency: 'Distance per Liter (Km/L):',
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
    rideDistance: 'Ride Distance (km):',
    rideTime: 'Ride Time (minutes):',
    shortTermProfit: 'Short Term Profit:',
    longTermProfit: 'Long Term Profit:',
    tips: 'Tips:',
    tip1: 'Consider waiting time in time spent. If you rent the vehicle, set the vehicle value to zero and include the rental value in maintenance costs.',
    tip2: 'Can be used for all platforms and vehicles! For all drivers, app-based (Ifood, Uber, 99, etc.), taxis, vans and even buses/planes/subways (requires creativity).',
    formula: 'Long Term Profit Formula: Revenue - Expenses (Fuel and Others) - Depreciation (3.33% * Vehicle Value per year) - Risk (10% * Insurance Premium per year). Note: short term profit only deducts ride fuel cost.',
    community: 'Join our <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">OpenSource Facebook Community</a>!!!',
    validationMessage: 'Please fill at least fuel price and efficiency',
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
    periodicityOptions: {
      annual: 'Annual',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily'
    }
  },
  // ... (todas as outras traduções com os novos campos adicionados)
};

const STORAGE_KEY = 'rideProfitCalculatorSettings';
const HISTORY_KEY = 'rideProfitCalculationHistory';

export default function CalculoLucro() {
  // Dados do veículo
  const [precoCombustivel, setPrecoCombustivel] = useState<string>('');
  const [kmPorLitro, setKmPorLitro] = useState<string>('');
  const [valorSeguro, setValorSeguro] = useState<string>('');
  const [periodicidadeSeguro, setPeriodicidadeSeguro] = useState<Periodicity>('annual');
  const [premioSeguro, setPremioSeguro] = useState<string>('');
  const [custosManutencao, setCustosManutencao] = useState<Cost[]>([
    { id: 1, descricao: 'Taxa', valor: 0, periodicity: 'annual' },
    { id: 2, descricao: 'Óleo', valor: 0, periodicity: 'annual' }
  ]);
  const [valorVeiculo, setValorVeiculo] = useState<string>('');

  // Jornada de trabalho
  const [horasPorDia, setHorasPorDia] = useState<string>('');
  const [diasPorSemana, setDiasPorSemana] = useState<string>('');

  // Dados da corrida
  const [valorCorrida, setValorCorrida] = useState<string>('');
  const [distanciaCorrida, setDistanciaCorrida] = useState<string>('');
  const [tempoCorrida, setTempoCorrida] = useState<string>('');

  // Resultados
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState<number | null>(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('pt');
  const [calculationHistory, setCalculationHistory] = useState<CalculationHistory[]>([]);

  const t = translations[language];

  // Carregar configurações salvas
  useEffect(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setPrecoCombustivel(parsedSettings.fuelPrice || '');
        setKmPorLitro(parsedSettings.kmPorLitro || '');
        setValorSeguro(parsedSettings.valorSeguro || '');
        setPeriodicidadeSeguro(parsedSettings.periodicidadeSeguro || 'annual');
        setPremioSeguro(parsedSettings.premioSeguro || '');
        setCustosManutencao(parsedSettings.custosManutencao || [
          { id: 1, descricao: 'Taxa', valor: 0, periodicity: 'annual' },
          { id: 2, descricao: 'Óleo', valor: 0, periodicity: 'annual' }
        ]);
        setValorVeiculo(parsedSettings.valorVeiculo || '');
        setHorasPorDia(parsedSettings.horasPorDia || '');
        setDiasPorSemana(parsedSettings.diasPorSemana || '');
        setLanguage(parsedSettings.language || 'pt');
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }

    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setCalculationHistory(parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

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

  // Cálculos principais
  useEffect(() => {
    const custoCombustivelPorKm = parseInput(kmPorLitro) > 0 ? parseInput(precoCombustivel) / parseInput(kmPorLitro) : 0;
    const custoCombustivelCorrida = custoCombustivelPorKm * parseInput(distanciaCorrida);
    setLucroCurtoPrazo(parseInput(valorCorrida) - custoCombustivelCorrida);

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
    custosManutencao, valorVeiculo, horasPorDia, diasPorSemana, 
    valorCorrida, distanciaCorrida, tempoCorrida
  ]);

  // Funções de persistência
  const saveSettings = () => {
    if (!precoCombustivel || !kmPorLitro) {
      alert(t.validationMessage);
      return;
    }

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
      setCustosManutencao([{id: 1, descricao: 'Taxa', valor: 0, periodicity: 'annual'}]);
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
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const settings = event.target?.result as string;
              localStorage.setItem(STORAGE_KEY, settings);
              window.location.reload();
            } catch (error) {
              alert(t.importError);
            }
          };
          reader.readAsText(file);
        }
      };
      
      document.body.appendChild(input);
      input.click();
      
      setTimeout(() => {
        document.body.removeChild(input);
      }, 100);
    } catch (error) {
      console.error('Error importing settings:', error);
      alert('Failed to import settings');
    }
  };

  // Funções de histórico
  const saveCalculation = () => {
    if (lucroCurtoPrazo === null || lucroLongoPrazo === null) return;

    const newHistory = [
      {
        shortTerm: lucroCurtoPrazo,
        longTerm: lucroLongoPrazo,
        timestamp: new Date()
      },
      ...calculationHistory
    ].slice(0, 10); // Limitar a 10 itens no histórico

    setCalculationHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      setCalculationHistory([]);
      localStorage.removeItem(HISTORY_KEY);
    }
  };

  // Funções de custos
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
      {/* Logo */}
      <img 
        src="/logo.svg" 
        alt="Logo" 
        style={{ 
          width: '166px',
          height: 'auto',
          marginBottom: '20px' 
        }} 
      />

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
                  value={custo.descricao}
                  onChange={(e) => atualizarCustoManutencao(custo.id, 'descricao', e.target.value)}
                  placeholder={t.costDescription}
                  style={{
                    flex: 1,
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
                  onChange={(e) => atualizarCustoManutencao(custo.id, 'periodicity', e.target.value as Periodicity)}
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

          {/* Botões de ação */}
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
            {lucroCurtoPrazo !== null ? `$ ${lucroCurtoPrazo.toFixed(2)}` : '---'}
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
            {lucroLongoPrazo !== null ? `$ ${lucroLongoPrazo.toFixed(2)}` : '---'}
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

      {/* Histórico de cálculos */}
      {calculationHistory.length > 0 && (
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
                  <th style={{ padding: '8px', textAlign: 'right', color: '#0f0' }}>{t.profitShort}</th>
                  <th style={{ padding: '8px', textAlign: 'right', color: '#0f0' }}>{t.profitLong}</th>
                </tr>
              </thead>
              <tbody>
                {calculationHistory.map((calc, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '8px', textAlign: 'left' }}>
                      {calc.timestamp.toLocaleString()}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      $ {calc.shortTerm.toFixed(2)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      $ {calc.longTerm.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
