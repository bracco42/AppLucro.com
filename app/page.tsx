'use client';

import React, { useState, useEffect } from 'react';

type Periodicity = 'annual' | 'monthly' | 'daily' | 'weekly';

type Cost = {
  id: number;
  description: string;
  value: number;
  periodicity: Periodicity;
};

type Language = 'en' | 'fr' | 'pt';

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
    insuranceValue: '*Insurance Value:',
    insurancePremium: 'Insurance Premium:',
    maintenanceCosts: '*Maintenance Costs:',
    addCost: 'Add Cost',
    remove: 'Remove',
    timeSpent: 'Time worked:',
    workingHours: 'Driving hours/day (1-16):',
    workingDays: 'Days/week (1-7):',
    vehicleValue: 'Current Vehicle Value (If Bought, depreciates):',
    rideValue: 'Paid Value:',
    rideDistance: 'Actual Distance (Km or Mi) Ridden Going/Returning:',
    rideTime: 'Ride Total Time Since The End of The Last One (in minutes):',
    shortTermProfit: 'Short Term Profit:',
    longTermProfit: 'Long Term Profit:',
    tips: 'Tips:',
    tip1: 'Consider waiting time in time spent. If you rent the vehicle, set the vehicle value to zero and include the rental value in maintenance costs.',
    tip2: 'Can be used for all platforms and vehicles! For all drivers, app-based (Ifood, Uber, 99, etc.), taxis, vans and even buses/planes/subways (requires creativity).',
    formula: 'Long Term Profit Formula: Revenue - Expenses (Fuel and Others*) - Depreciation (3.33% * Vehicle Value per year) - Risk (10% * Insurance Premium per year). Note: short term profit only deducts ride fuel cost.',
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
    changeLanguageConfirmation: 'Changing language will reset unsaved data. Continue?',
    defaultCosts: [
      { id: 1, description: 'Tax', value: 0, periodicity: 'annual' as Periodicity },
      { id: 2, description: 'Oil', value: 0, periodicity: 'annual' as Periodicity }
    ],
    periodicityOptions: {
      annual: 'Annual',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily'
    }
  },
  'fr': {
    title: 'Calculateur de Bénéfices de Course (Toutes Plateformes/Véhicules)',
    subtitle: 'Pour la prise de décision à court et long terme',
    registerButton: 'Enregistrer les Données du Véhicule',
    closeButton: 'Fermer l\'Enregistrement',
    saveButton: 'Sauvegarder',
    resetButton: 'Réinitialiser',
    exportButton: 'Exporter les Paramètres',
    importButton: 'Importer les Paramètres',
    fuelPrice: 'Prix du Carburant par Litre:',
    fuelEfficiency: 'Distance par Litre (km/L ou mi/L):',
    insuranceValue: '*Valeur de l\'Assurance:',
    insurancePremium: 'Prime d\'Assurance:',
    maintenanceCosts: '*Coûts de Maintenance:',
    addCost: 'Ajouter un Coût',
    remove: 'Supprimer',
    timeSpent: 'Temps travaillé:',
    workingHours: 'Heures de conduite/jour (1-16):',
    workingDays: 'Jours/semaine (1-7):',
    vehicleValue: 'Valeur Actuelle du Véhicule (Si Acheté, déprécie):',
    rideValue: 'Valeur Payée:',
    rideDistance: 'Distance Réelle (Km ou Mi) Aller/Retour:',
    rideTime: 'Temps Total de Course depuis la Fin de la Dernière (en minutes):',
    shortTermProfit: 'Bénéfice à Court Terme:',
    longTermProfit: 'Bénéfice à Long Terme:',
    tips: 'Conseils:',
    tip1: 'Prenez en compte le temps d\'attente dans le temps passé. Si vous louez le véhicule, mettez la valeur du véhicule à zéro et incluez le prix de location dans les coûts de maintenance.',
    tip2: 'Peut être utilisé pour toutes les plateformes et véhicules ! Pour tous les conducteurs, applications (Ifood, Uber, 99, etc.), taxis, fourgonnettes et même bus/avions/métros (nécessite de la créativité).',
    formula: 'Formule de Bénéfice à Long Terme : Revenu - Dépenses (Carburant et Autres*) - Dépréciation (3.33% * Valeur du Véhicule par an) - Risque (10% * Prime d\'Assurance par an). Note : le bénéfice à court terme ne déduit que le coût du carburant.',
    importError: 'Erreur lors de l\'importation des paramètres',
    history: 'Historique des Calculs',
    saveCalculation: 'Sauvegarder le Calcul',
    clearHistory: 'Effacer l\'Historique',
    costDescription: 'Description du Coût',
    costValue: 'Valeur',
    costPeriodicity: 'Périodicité',
    calculationTime: 'Date/Heure',
    profitShort: 'Bénéfice Court',
    profitLong: 'Bénéfice Long',
    actions: 'Actions',
    rideMinutes: 'Minutes',
    rideValueHistory: 'Valeur',
    rideDistanceHistory: 'Distance',
    delete: 'Supprimer',
    details: 'Détails',
    noHistory: 'Aucun calcul dans l\'historique',
    calculationDetails: 'Détails du Calcul',
    closeDetails: 'Fermer les Détails',
    fuelCost: 'Coût Carburant',
    maintenanceCost: 'Coût Maintenance',
    insuranceCost: 'Coût Assurance',
    depreciation: 'Dépréciation',
    riskCost: 'Coût Risque',
    totalCosts: 'Coûts Totaux',
    changeLanguageConfirmation: 'Changer la langue réinitialisera les données non sauvegardées. Continuer?',
    defaultCosts: [
      { id: 1, description: 'Taxe', value: 0, periodicity: 'annual' as Periodicity },
      { id: 2, description: 'Huile', value: 0, periodicity: 'annual' as Periodicity }
    ],
    periodicityOptions: {
      annual: 'Annuel',
      monthly: 'Mensuel',
      weekly: 'Hebdomadaire',
      daily: 'Quotidien'
    }
  },
  'pt': {
    title: 'Calculadora de Lucros de Corridas (Todas Plataformas/Veículos)',
    subtitle: 'Destinado à tomada de decisões de curto e longo prazo',
    registerButton: 'Cadastrar Dados do Veículo',
    closeButton: 'Fechar Cadastro',
    saveButton: 'Salvar',
    resetButton: 'Resetar',
    exportButton: 'Exportar Config',
    importButton: 'Importar Config',
    fuelPrice: 'Preço do Combustível por Litro:',
    fuelEfficiency: 'Distância Percorrida por Litro (km/L):',
    insuranceValue: '*Valor do Seguro:',
    insurancePremium: 'Prêmio do Seguro:',
    maintenanceCosts: '*Custos de Manutenção:',
    addCost: 'Adicionar Custo',
    remove: 'Remover',
    timeSpent: 'Tempo trabalhado:',
    workingHours: 'Horas dirigidas/dia (1-16):',
    workingDays: 'Dias/semana (1-7):',
    vehicleValue: 'Valor Atual do Veículo (Se Comprado, deprecia):',
    rideValue: 'Valor Pago:',
    rideDistance: 'Distância Percorrida (Km) Total na Ida/Volta:',
    rideTime: 'Tempo da Corrida Total desde encerramento da última (em minutos):',
    shortTermProfit: 'Lucro de Curto Prazo:',
    longTermProfit: 'Lucro de Longo Prazo:',
    tips: 'Dicas:',
    tip1: 'Levar espera em consideração no tempo gasto. Se você aluga o veículo, deixe o valor do veículo como zero e inclua o valor do aluguel nos custos de manutenção.',
    tip2: 'Pode ser usado em todas as plataformas e veículos! Para todos os motoristas, tanto aplicativos (Ifood, Uber, 99, etc.) quanto taxi, vans e até ônibus/avião/metrô (demanda criatividade).',
    formula: 'Fórmula do Lucro de Longo Prazo: Receita - Despesas (Combustível e Outros*) - Depreciação (3.33% * Valor do Veículo por ano) - Risco (10% * Prêmio do Seguro por ano).',
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
    riskCost: 'Custo Risque',
    totalCosts: 'Custos Totais',
    changeLanguageConfirmation: 'Mudar o idioma irá resetar dados não salvos. Continuar?',
    defaultCosts: [
      { id: 1, description: 'Taxa (IPVA/Impostos)', value: 0, periodicity: 'annual' as Periodicity },
      { id: 2, description: 'Óleo', value: 0, periodicity: 'annual' as Periodicity }
    ],
    periodicityOptions: {
      annual: 'Anual',
      monthly: 'Mensal',
      weekly: 'Semanal',
      daily: 'Diário'
    }
  }
};

const STORAGE_KEY = 'rideProfitCalculatorSettings';
const HISTORY_KEY = 'rideProfitCalculationHistory';

const isValidSettings = (data: any): boolean => {
  try {
    if (!data || typeof data !== 'object') return false;
    return 'fuelPrice' in data && 'fuelEfficiency' in data;
  } catch {
    return false;
  }
};

// Função para formatar valores monetários com $ independente do idioma
const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export default function RideProfitCalculator() {
  const [fuelPrice, setFuelPrice] = useState<string>('');
  const [fuelEfficiency, setFuelEfficiency] = useState<string>('');
  const [insuranceValue, setInsuranceValue] = useState<string>('');
  const [insurancePeriodicity, setInsurancePeriodicity] = useState<Periodicity>('annual');
  const [insurancePremium, setInsurancePremium] = useState<string>('');
  const [language, setLanguage] = useState<Language>('en');
  const [maintenanceCosts, setMaintenanceCosts] = useState<Cost[]>(translations['en'].defaultCosts);
  const [vehicleValue, setVehicleValue] = useState<string>('');
  const [workingHours, setWorkingHours] = useState<string>('');
  const [workingDays, setWorkingDays] = useState<string>('');
  const [rideValue, setRideValue] = useState<string>('');
  const [rideDistance, setRideDistance] = useState<string>('');
  const [rideTime, setRideTime] = useState<string>('');
  const [shortTermProfit, setShortTermProfit] = useState<number | null>(null);
  const [longTermProfit, setLongTermProfit] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<CalculationHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCalculation, setSelectedCalculation] = useState<CalculationHistory | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const t = translations[language];

  useEffect(() => {
    const handleError = (err: ErrorEvent) => {
      console.error('Global error:', err);
      setError(t.importError);
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
          setFuelPrice(parsedSettings.fuelPrice || '');
          setFuelEfficiency(parsedSettings.fuelEfficiency || '');
          setInsuranceValue(parsedSettings.insuranceValue || '');
          setInsurancePeriodicity(parsedSettings.insurancePeriodicity || 'annual');
          setInsurancePremium(parsedSettings.insurancePremium || '');
          
          if (Array.isArray(parsedSettings.maintenanceCosts)) {
            setMaintenanceCosts(parsedSettings.maintenanceCosts.map((c: any) => ({
              id: c.id || Date.now(),
              description: c.description || '',
              value: typeof c.value === 'number' ? c.value : 0,
              periodicity: ['annual', 'monthly', 'weekly', 'daily'].includes(c.periodicity) 
                ? c.periodicity 
                : 'annual'
            })));
          }
          
          setVehicleValue(parsedSettings.vehicleValue || '');
          setWorkingHours(parsedSettings.workingHours || '');
          setWorkingDays(parsedSettings.workingDays || '');
          setLanguage(['en', 'fr', 'pt'].includes(parsedSettings.language) ? parsedSettings.language : 'en');
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
  }, []);

  useEffect(() => {
    // Update maintenance costs descriptions when language changes
    setMaintenanceCosts(prev => {
      const defaultCosts = translations[language].defaultCosts;
      return prev.map((cost, index) => ({
        ...cost,
        description: cost.description === translations['en'].defaultCosts[index]?.description 
          ? defaultCosts[index]?.description 
          : cost.description
      }));
    });
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

  const handleWorkingHours = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ''));
    if (!isNaN(num) && num >= 1 && num <= 16) {
      setWorkingHours(num.toString());
    } else if (value === '') {
      setWorkingHours('');
    }
  };

  const handleWorkingDays = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ''));
    if (!isNaN(num) && num >= 1 && num <= 7) {
      setWorkingDays(num.toString());
    } else if (value === '') {
      setWorkingDays('');
    }
  };

  useEffect(() => {
    if (!fuelPrice || !fuelEfficiency || !rideValue || !rideDistance || !rideTime) {
      setShortTermProfit(null);
      setLongTermProfit(null);
      return;
    }

    const fuelCostPerKm = parseInput(fuelEfficiency) > 0 ? parseInput(fuelPrice) / parseInput(fuelEfficiency) : 0;
    const rideFuelCost = fuelCostPerKm * parseInput(rideDistance);
    const shortTerm = parseInput(rideValue) - rideFuelCost;
    setShortTermProfit(isNaN(shortTerm) ? null : shortTerm);

    const daysPerWeek = parseInput(workingDays) || 5;
    const hoursPerDay = parseInput(workingHours) || 8;
    const annualWorkedMinutes = hoursPerDay * 60 * daysPerWeek * 252 / 5;

    const annualCosts = maintenanceCosts.map(c => {
      switch(c.periodicity) {
        case 'monthly': return c.value * 12;
        case 'weekly': return c.value * (252 / daysPerWeek);
        case 'daily': return c.value * (252 * daysPerWeek / 5 * hoursPerDay / 8);
        default: return c.value;
      }
    });

    const annualInsurance = (() => {
      switch(insurancePeriodicity) {
        case 'monthly': return parseInput(insuranceValue) * 12;
        case 'weekly': return parseInput(insuranceValue) * (252 / daysPerWeek);
        case 'daily': return parseInput(insuranceValue) * (252 * daysPerWeek / 5 * hoursPerDay / 8);
        default: return parseInput(insuranceValue);
      }
    })();

    const annualPremium = parseInput(insurancePremium);
    const timeFactor = annualWorkedMinutes > 0 ? parseInput(rideTime) / annualWorkedMinutes : 0;

    const rideMaintenanceCost = annualCosts.reduce((a, b) => a + b, 0) * timeFactor;
    const rideInsuranceCost = annualInsurance * timeFactor;
    const rideDepreciation = parseInput(vehicleValue) * 0.0333 * timeFactor;
    const rideRiskCost = annualPremium * 0.1 * timeFactor;

    const longTerm = parseInput(rideValue) - 
      rideFuelCost - 
      rideMaintenanceCost - 
      rideInsuranceCost - 
      rideDepreciation - 
      rideRiskCost;
      
    setLongTermProfit(isNaN(longTerm) ? null : longTerm);
  }, [
    fuelPrice, fuelEfficiency, insuranceValue, insurancePeriodicity, insurancePremium,
    maintenanceCosts, vehicleValue, workingHours, workingDays, 
    rideValue, rideDistance, rideTime
  ]);

  const saveSettings = () => {
    const settingsToSave = {
      fuelPrice,
      fuelEfficiency,
      insuranceValue,
      insurancePeriodicity,
      insurancePremium,
      maintenanceCosts,
      vehicleValue,
      workingHours,
      workingDays,
      language
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
    setShowModal(false);
  };

  const resetSettings = () => {
    if (confirm(t.resetButton + '?')) {
      localStorage.removeItem(STORAGE_KEY);
      setFuelPrice('');
      setFuelEfficiency('');
      setInsuranceValue('');
      setInsurancePeriodicity('annual');
      setInsurancePremium('');
      setMaintenanceCosts(translations[language].defaultCosts);
      setVehicleValue('');
      setWorkingHours('');
      setWorkingDays('');
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
      alert(t.importError);
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
    if (shortTermProfit === null || longTermProfit === null || !rideTime || !rideValue || !rideDistance) return;

    const fuelCostPerKm = parseInput(fuelEfficiency) > 0 ? parseInput(fuelPrice) / parseInput(fuelEfficiency) : 0;
    const rideFuelCost = fuelCostPerKm * parseInput(rideDistance);

    const daysPerWeek = parseInput(workingDays) || 5;
    const hoursPerDay = parseInput(workingHours) || 8;
    const annualWorkedMinutes = hoursPerDay * 60 * daysPerWeek * 252 / 5;
    const timeFactor = annualWorkedMinutes > 0 ? parseInput(rideTime) / annualWorkedMinutes : 0;

    const annualCosts = maintenanceCosts.map(c => {
      switch(c.periodicity) {
        case 'monthly': return c.value * 12;
        case 'weekly': return c.value * (252 / daysPerWeek);
        case 'daily': return c.value * (252 * daysPerWeek / 5 * hoursPerDay / 8);
        default: return c.value;
      }
    });

    const annualInsurance = (() => {
      switch(insurancePeriodicity) {
        case 'monthly': return parseInput(insuranceValue) * 12;
        case 'weekly': return parseInput(insuranceValue) * (252 / daysPerWeek);
        case 'daily': return parseInput(insuranceValue) * (252 * daysPerWeek / 5 * hoursPerDay / 8);
        default: return parseInput(insuranceValue);
      }
    })();

    const annualPremium = parseInput(insurancePremium);
    const rideMaintenanceCost = annualCosts.reduce((a, b) => a + b, 0) * timeFactor;
    const rideInsuranceCost = annualInsurance * timeFactor;
    const rideDepreciation = parseInput(vehicleValue) * 0.0333 * timeFactor;
    const rideRiskCost = annualPremium * 0.1 * timeFactor;

    const newHistory = [
      {
        id: Date.now().toString(),
        shortTerm: shortTermProfit,
        longTerm: longTermProfit,
        rideMinutes: parseInput(rideTime),
        rideValue: parseInput(rideValue),
        rideDistance: parseInput(rideDistance),
        fuelCost: rideFuelCost,
        maintenanceCost: rideMaintenanceCost,
        insuranceCost: rideInsuranceCost,
        depreciation: rideDepreciation,
        riskCost: rideRiskCost,
        timestamp: new Date()
      },
      ...calculationHistory
    ].slice(0, 20);

    setCalculationHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    if (confirm(t.clearHistory + '?')) {
      setCalculationHistory([]);
      localStorage.removeItem(HISTORY_KEY);
    }
  };

  const deleteCalculation = (id: string) => {
    if (confirm(t.delete + '?')) {
      const updatedHistory = calculationHistory.filter(item => item.id !== id);
      setCalculationHistory(updatedHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    }
  };

  const showCalculationDetails = (calc: CalculationHistory) => {
    setSelectedCalculation(calc);
    setShowDetails(true);
  };

  const addMaintenanceCost = () => {
    setMaintenanceCosts([...maintenanceCosts, {
      id: Date.now(),
      description: '',
      value: 0,
      periodicity: 'annual'
    }]);
  };

  const removeMaintenanceCost = (id: number) => {
    if (maintenanceCosts.length > 1) {
      setMaintenanceCosts(maintenanceCosts.filter(cost => cost.id !== id));
    }
  };

  const updateMaintenanceCost = (id: number, field: string, value: any) => {
    setMaintenanceCosts(maintenanceCosts.map(cost => 
      cost.id === id ? {...cost, [field]: field === 'value' ? parseInput(value) : value} : cost
    ));
  };

  const changeLanguage = (lang: Language) => {
     setLanguage(lang);
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
      <div style={{ marginBottom: '20px' }}>
        <img 
          src="/logo.svg" 
          alt="Ride Profit Calculator Logo"
          style={{ 
            width: 'min(300px, 80vw)',  // Usa 300px ou 80% da largura da tela (o que for menor)
            height: 'auto',             // Mantém a proporção
            maxHeight: '300px',        // Limita a altura máxima
            filter: 'drop-shadow(0 0 5px #0f0)',
            margin: '0 auto',
            display: 'block'           // Garante que as margens automáticas funcionem
          }}
        />
      </div>
      
      {error && (
        <div style={{ color: 'red', padding: '20px', background: '#ffecec' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value as Language)}
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
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="pt">PT</option>
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
              value={fuelPrice} 
              onChange={(e) => handleNumberInput(e.target.value, setFuelPrice)} 
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
              value={fuelEfficiency} 
              onChange={(e) => handleNumberInput(e.target.value, setFuelEfficiency)} 
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
                value={insuranceValue} 
                onChange={(e) => handleNumberInput(e.target.value, setInsuranceValue)} 
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
                value={insurancePeriodicity}
                onChange={(e) => setInsurancePeriodicity(e.target.value as Periodicity)}
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
              value={insurancePremium} 
              onChange={(e) => handleNumberInput(e.target.value, setInsurancePremium)} 
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
            {maintenanceCosts.map((cost) => (
              <div 
                key={cost.id} 
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
                  value={cost.description}
                  onChange={(e) => updateMaintenanceCost(cost.id, 'description', e.target.value)}
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
                  value={cost.value} 
                  onChange={(e) => updateMaintenanceCost(cost.id, 'value', e.target.value)}
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
                  value={cost.periodicity}
                  onChange={(e) => updateMaintenanceCost(cost.id, 'periodicity', e.target.value as Periodicity)}
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
                {maintenanceCosts.length > 1 && (
                  <button
                    onClick={() => removeMaintenanceCost(cost.id)}
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
              onClick={addMaintenanceCost}
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
              value={workingHours} 
              onChange={(e) => handleWorkingHours(e.target.value)}
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
              value={workingDays} 
              onChange={(e) => handleWorkingDays(e.target.value)}
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
              value={vehicleValue} 
              onChange={(e) => handleNumberInput(e.target.value, setVehicleValue)} 
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
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
        textAlign: 'left'
      }}>
        <h3 style={{ color: '#0f0', marginTop: 0, marginBottom: '15px' }}>{t.tips}</h3>
        
        <p style={{ marginBottom: '10px' }}>{t.tip2}</p>
        <p style={{ marginBottom: '10px', fontStyle: 'italic' }}>{t.formula}</p>
        
        <div style={{ color: 'white', fontFamily: 'Arial, sans-serif', marginBottom: '10px' }}>
          OpenSource!!!{' '}
          <a 
            href="https://bernarddinizbracco.live" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 'bold',
              textShadow: '0 0 5px #ffffff, 0 0 10px #6ec1ff',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.textShadow = '0 0 10px #ffffff, 0 0 20px #ffffff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.textShadow = '0 0 5px #ffffff, 0 0 10px #ffffff';
            }}
          >
            bernarddinizbracco.live
          </a>
        </div>
     
      <div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
      }}>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>{t.rideValue}</label>
          <input 
            type="text" 
            value={rideValue} 
            onChange={(e) => handleNumberInput(e.target.value, setRideValue)} 
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
            value={rideDistance} 
            onChange={(e) => handleNumberInput(e.target.value, setRideDistance)} 
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
            value={rideTime} 
            onChange={(e) => handleNumberInput(e.target.value, setRideTime)} 
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

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.shortTermProfit}</div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              backgroundColor: shortTermProfit !== null && shortTermProfit >= 0 ? '#333300' : '#330000',
              padding: '5px',
              borderRadius: '5px'
            }}>
              {shortTermProfit !== null ? 
                formatCurrency(shortTermProfit) : 
                '---'}
            </div>
          </div>
          <div style={{ textAlign: 'right', flex: 1 }}>
            <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.longTermProfit}</div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              backgroundColor: longTermProfit !== null && longTermProfit >= 0 ? '#003300' : '#330000',
              padding: '5px',
              borderRadius: '5px'
            }}>
              {longTermProfit !== null ? 
                formatCurrency(longTermProfit) : 
                '---'}
            </div>
          </div>
        </div>

        <button
          onClick={saveCalculation}
          disabled={shortTermProfit === null || longTermProfit === null}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: shortTermProfit === null || longTermProfit === null ? '#555' : '#0f0',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: shortTermProfit === null || longTermProfit === null ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {t.saveCalculation}
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3 style={{ color: '#0f0', margin: 0 }}>{t.history}</h3>
          <button
            onClick={clearHistory}
            disabled={calculationHistory.length === 0}
            style={{
              padding: '8px 12px',
              backgroundColor: calculationHistory.length === 0 ? '#555' : '#f00',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: calculationHistory.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            {t.clearHistory}
          </button>
        </div>

        {calculationHistory.length > 0 ? (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #0f0' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>{t.calculationTime}</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>{t.rideMinutes}</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>{t.rideValueHistory}</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>{t.profitShort}</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>{t.profitLong}</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {calculationHistory.map((calc) => (
                  <tr key={calc.id} style={{ borderBottom: '1px solid #444' }}>
                    <td style={{ padding: '8px', textAlign: 'left' }}>
                      {calc.timestamp.toLocaleString(language)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      {calc.rideMinutes}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      {formatCurrency(calc.rideValue)}
                    </td>
                    <td style={{ 
                      padding: '8px', 
                      textAlign: 'right',
                      backgroundColor: calc.shortTerm >= 0 ? '#333300' : '#330000'
                    }}>
                      {formatCurrency(calc.shortTerm)}
                    </td>
                    <td style={{ 
                      padding: '8px', 
                      textAlign: 'right',
                      backgroundColor: calc.longTerm >= 0 ? '#003300' : '#330000'
                    }}>
                      {formatCurrency(calc.longTerm)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      <button
                        onClick={() => showCalculationDetails(calc)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#0f0',
                          color: '#000',
                          border: 'none',
                          borderRadius: '5px',
                          marginRight: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        {t.details}
                      </button>
                      <button
                        onClick={() => deleteCalculation(calc.id)}
                        style={{
                          padding: '5px 10px',
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
        ) : (
          <div style={{ padding: '20px', color: '#aaa', textAlign: 'center' }}>
            {t.noHistory}
          </div>
        )}
      </div>

      {showDetails && selectedCalculation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#222',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#0f0', margin: 0 }}>{t.calculationDetails}</h3>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  padding: '5px 10px',
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
              <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.calculationTime}</div>
              <div>{selectedCalculation.timestamp.toLocaleString(language)}</div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.rideValueHistory}</div>
              <div>{formatCurrency(selectedCalculation.rideValue)}</div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.rideDistanceHistory}</div>
              <div>{selectedCalculation.rideDistance} {language === 'pt' ? 'km' : language === 'fr' ? 'km' : 'mi/km'}</div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.rideMinutes}</div>
              <div>{selectedCalculation.rideMinutes} {language === 'pt' ? 'minutos' : language === 'fr' ? 'minutes' : 'minutes'}</div>
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '15px'
            }}>
              <div style={{
                backgroundColor: '#333300',
                padding: '10px',
                borderRadius: '5px'
              }}>
                <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.fuelCost}</div>
                <div>{formatCurrency(selectedCalculation.fuelCost)}</div>
              </div>
              <div>
                <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.maintenanceCost}</div>
                <div>{formatCurrency(selectedCalculation.maintenanceCost)}</div>
              </div>
              <div>
                <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.insuranceCost}</div>
                <div>{formatCurrency(selectedCalculation.insuranceCost)}</div>
              </div>
              <div>
                <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.depreciation}</div>
                <div>{formatCurrency(selectedCalculation.depreciation)}</div>
              </div>
              <div>
                <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.riskCost}</div>
                <div>{formatCurrency(selectedCalculation.riskCost)}</div>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.totalCosts}</div>
              <div>
                {formatCurrency(
                  selectedCalculation.fuelCost + 
                  selectedCalculation.maintenanceCost + 
                  selectedCalculation.insuranceCost + 
                  selectedCalculation.depreciation + 
                  selectedCalculation.riskCost
                )}
              </div>
            </div>

            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}>
              <div>
                <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.profitShort}</div>
                <div style={{ 
                  color: selectedCalculation.shortTerm >= 0 ? '#0f0' : '#f00',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: '#333300',
                  padding: '5px',
                  borderRadius: '5px'
                }}>
                  {formatCurrency(selectedCalculation.shortTerm)}
                </div>
              </div>
              <div>
                <div style={{ color: '#0f0', marginBottom: '5px' }}>{t.profitLong}</div>
                <div style={{ 
                  color: selectedCalculation.longTerm >= 0 ? '#0f0' : '#f00',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: '#003300',
                  padding: '5px',
                  borderRadius: '5px'
                }}>
                  {formatCurrency(selectedCalculation.longTerm)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
