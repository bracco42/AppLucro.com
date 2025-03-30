'use client';

import React, { useState, useEffect } from 'react';

type Periodicity = 'annual' | 'monthly' | 'daily' | 'weekly';
type Cost = {
  id: number;
  valor: number;
  periodicity: Periodicity;
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

  useEffect(() => {
    calcularLucros();
  }, [precoCombustivel, kmPorLitro, valorSeguro, periodicidadeSeguro, premioSeguro, custosManutencao, distanciaPercorrida, periodicidadeDistancia, valorVeiculo, valorCorrida, KmRodados]);

  const calcularLucros = () => {
    if ([precoCombustivel, kmPorLitro, valorSeguro, distanciaPercorrida, valorVeiculo, valorCorrida, KmRodados].some(val => val <= 0 || isNaN(val))) {
      setLucroCurtoPrazo(null);
      setLucroLongoPrazo(null);
      return;
    }

    const custoCombustivelPorKm = precoCombustivel / kmPorLitro;
    const custoCombustivelCorrida = custoCombustivelPorKm * KmRodados;
    const lucroCurto = valorCorrida - custoCombustivelCorrida;
    setLucroCurtoPrazo(lucroCurto);

    // Converter todos os custos para valor anual
    const converterParaAnual = (valor: number, periodicity: Periodicity) => {
      switch(periodicity) {
        case 'monthly': return valor * 12;
        case 'weekly': return valor * 52;
        case 'daily': return valor * 252; // 252 dias úteis
        default: return valor;
      }
    };

    // Converter distância para diária
    const converterDistanciaParaDiaria = (valor: number, periodicity: Periodicity) => {
      switch(periodicity) {
        case 'monthly': return valor / 21; // 21 dias úteis no mês
        case 'weekly': return valor / 5;   // 5 dias úteis na semana
        default: return valor;             // diário
      }
    };

    const distanciaDiaria = converterDistanciaParaDiaria(distanciaPercorrida, periodicidadeDistancia);
    
    const custosAnuais = custosManutencao.map(custo => converterParaAnual(custo.valor, custo.periodicity));
    const seguroAnual = converterParaAnual(valorSeguro, periodicidadeSeguro);
    
    const totalManutencaoAnual = custosAnuais.reduce((total, valor) => total + valor, 0);
    
    // Inclui 10% do prêmio do seguro no cálculo anual
    const premioAnual = converterParaAnual(premioSeguro, 'annual') * 0.1;
    const seguroTotalAnual = seguroAnual + premioAnual;
    
    // Cálculo proporcional por corrida
    const custoManutencaoCorrida = (totalManutencaoAnual + seguroTotalAnual) * KmRodados / (distanciaDiaria * 252);
    const depreciaçãoVeiculo = (valorVeiculo * 0.0333 * KmRodados) / (distanciaDiaria * 252);
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
      <img src="./logo.png" alt="Logo" style={{ width: '150px', marginBottom: '10px' }} />
      <div style={{ color: '#fff', fontSize: '24px', marginBottom: '5px' }}>AppLucro.com</div>
      <h1 style={{ color: '#0f0' }}>Funcionalidade Para Calcular Lucros de Corridas</h1>
      <h2 style={{ color: '#0f0', fontSize: '18px', marginBottom: '20px' }}>Destinado à tomada de decisões de curto e longo prazo</h2>
      
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
        {showModal ? 'Fechar Cadastro' : 'Cadastrar Dados do Veículo'}
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
          <h2 style={{ color: '#0f0' }}>Cadastro de Dados do Veículo</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Preço do Combustível (por litro):</label>
            <input 
              type="number" 
              value={precoCombustivel} 
              onChange={(e) => setPrecoCombustivel(parseFloat(e.target.value) || 0)} 
              style={{ width: '50%', marginLeft: '10px', padding: '5px' }}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Km/L (Mi/L ou outra medida) feitas pelo veículo:</label>
            <input 
              type="number" 
              value={kmPorLitro} 
              onChange={(e) => setKmPorLitro(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Valor do Seguro:</label>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
              <input 
                type="number" 
                value={valorSeguro} 
                onChange={(e) => setValorSeguro(parseFloat(e.target.value) || 0)} 
                required 
                style={{ flex: 1, padding: '5px' }}
              />
              <select
                value={periodicidadeSeguro}
                onChange={(e) => setPeriodicidadeSeguro(e.target.value as Periodicity)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="annual">Anual</option>
                <option value="monthly">Mensal</option>
                <option value="weekly">Semanal</option>
                <option value="daily">Diário</option>
              </select>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Prêmio do Seguro (x10% de probabilidade de batida ao ano):</label>
            <input 
              type="number" 
              value={premioSeguro} 
              onChange={(e) => setPremioSeguro(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Custos de Manutenção:</label>
            {custosManutencao.map((custo) => (
              <div key={custo.id} style={{marginBottom: '10px'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                  <input 
                    type="number" 
                    value={custo.valor} 
                    onChange={(e) => atualizarCustoManutencao(custo.id, 'valor', parseFloat(e.target.value))} 
                    required 
                    style={{ flex: 1, padding: '5px' }}
                  />
                  <select
                    value={custo.periodicity}
                    onChange={(e) => atualizarCustoManutencao(custo.id, 'periodicity', e.target.value)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  >
                    <option value="annual">Anual</option>
                    <option value="monthly">Mensal</option>
                    <option value="weekly">Semanal</option>
                    <option value="daily">Diário</option>
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
                      Remover
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
              Adicionar Custo
            </button>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Distância percorrida:</label>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
              <input 
                type="number" 
                value={distanciaPercorrida} 
                onChange={(e) => setDistanciaPercorrida(parseFloat(e.target.value) || 0)} 
                required 
                style={{ flex: 1, padding: '5px' }}
              />
              <select
                value={periodicidadeDistancia}
                onChange={(e) => setPeriodicidadeDistancia(e.target.value as Periodicity)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="daily">Diária</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Valor Atual do Veículo se Comprado (deprecia 3.33% no ano):</label>
            <input 
              type="number" 
              value={valorVeiculo} 
              onChange={(e) => setValorVeiculo(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
              required 
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
            Salvar
          </button>
        </div>
      )}

      <div style={{ margin: '15px 0' }}>
        <label>Valor Pago App/Cliente:</label>
        <input 
          type="number" 
          value={valorCorrida} 
          onChange={(e) => setValorCorrida(parseFloat(e.target.value) || 0)} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <label>Km/Mi da Corrida (distância percorrida):</label>
        <input 
          type="number" 
          value={KmRodados} 
          onChange={(e) => setKmRodados(parseFloat(e.target.value) || 0)} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <div style={{ margin: '15px 0' }}>
        <label>Lucro de Curto Prazo (desconta custo do combustível):</label>
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
        <label>Lucro de Longo Prazo (desconta custo do combustível e todos os outros):</label>
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
        <strong style={{ color: '#0f0' }}>Obs.:</strong> Fórmula do Lucro de Longo Prazo = Valor Pago App/Cliente - Custo do combustível - Custos de manutenção - Valor do Seguro - Prêmio do Seguro * 10% - Valor Atual do Veículo * 3.33%
        <br /><br />
        Comunidade Open Source! Falar com bernard.bracco no Instagram ou Ehnov7id30 ou Bernard Diniz Bracco no Facebook! Para doações segue o PIX: 100.980.686-60. Custos até então: 4 semanas de mão de obra e 80 reais. Receita até então: 0.
      </p>
    </div>
  );
}
