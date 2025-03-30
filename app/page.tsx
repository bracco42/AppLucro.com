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
  // ... (mantenha todas as traduções como no código anterior) ...
};

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
