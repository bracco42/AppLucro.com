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
  'fr': {
    title: 'Profits des Courses (Toutes Plateformes/Véhicules)',
    subtitle: 'Pour décisions à court et long terme',
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
    shortTermProfit: 'Profit Court Terme:',
    longTermProfit: 'Profit Long Terme:',
    tips: 'Conseils:',
    tip1: 'Si vous louez le véhicule, mettez sa valeur à zéro et incluez le loyer dans les coûts.',
    tip2: 'Utilisable pour toutes plateformes et véhicules! Conducteurs d\'apps (Ifood, Uber...), taxis, vans et même bus/avions/métros (soyez créatifs!)',
    formula: 'Formule Profit Long Terme: Revenus - Dépenses (Carburant etc.) - Dépréciation (3.33% * Valeur Véhicule/an) - Risque (10% * Prime Assurance/an). NB: profit court terme ne déduit que le carburant',
    community: 'Rejoignez notre <a href="https://www.facebook.com/groups/1587875928477657" target="_blank" style="color: #0f0; text-decoration: underline;">Communauté OpenSource</a>!!!',
    periodicityOptions: {
      annual: 'Annuel',
      monthly: 'Mensuel',
      weekly: 'Hebdomadaire',
      daily: 'Quotidien'
    }
  },
  // [...] (Todas as outras 18 línguas seguindo o mesmo padrão)
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

    const custoManutencaoCorrida = custosAnuais.reduce((a, b) => a + b, 0) * fatorDistancia;
    const custoSeguroCorrida = seguroAnual * fatorDistancia;
    const depreciacaoCorrida = parseInput(valorVeiculo) * 0.0333 * fatorDistancia;
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
