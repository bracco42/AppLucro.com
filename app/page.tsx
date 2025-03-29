'use client';

import React, { useState, useEffect } from 'react';

export default function CalculoLucro() {
  const [precoCombustivel, setPrecoCombustivel] = useState(5);
  const [kmPorLitro, setKmPorLitro] = useState(35);
  const [valorSeguro, setValorSeguro] = useState(2000);
  const [custosManutencao, setCustosManutencao] = useState<{id: number, valor: number}[]>([{id: 1, valor: 20000}]);
  const [kmsPorDia, setKmsPorDia] = useState(250);
  const [valorVeiculo, setValorVeiculo] = useState(15000);
  const [valorCorrida, setValorCorrida] = useState(15);
  const [kmsRodados, setKmsRodados] = useState(10);
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState<number | null>(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    calcularLucros();
  }, [precoCombustivel, kmPorLitro, valorSeguro, custosManutencao, kmsPorDia, valorVeiculo, valorCorrida, kmsRodados]);

  const calcularLucros = () => {
    if ([precoCombustivel, kmPorLitro, valorSeguro, kmsPorDia, valorVeiculo, valorCorrida, kmsRodados].some(val => val <= 0 || isNaN(val))) {
      setLucroCurtoPrazo(null);
      setLucroLongoPrazo(null);
      return;
    }

    const custoCombustivelPorKm = precoCombustivel / kmPorLitro;
    const custoCombustivelCorrida = custoCombustivelPorKm * kmsRodados;
    const lucroCurto = valorCorrida - custoCombustivelCorrida;
    setLucroCurtoPrazo(lucroCurto);

    // Soma todos os custos de manutenção
    const totalManutencaoAnual = custosManutencao.reduce((total, custo) => total + custo.valor, 0);
    
    const custoManutencaoCorrida = ((totalManutencaoAnual + valorSeguro) || (0.0333 * valorVeiculo)) * kmsRodados / (kmsPorDia * 252);
    const depreciaçãoVeiculo = (valorVeiculo * 0.0333 * kmsRodados) / (kmsPorDia * 252);
    const lucroLongo = valorCorrida - custoCombustivelCorrida - custoManutencaoCorrida - depreciaçãoVeiculo;
    setLucroLongoPrazo(lucroLongo);
  };

  const adicionarCustoManutencao = () => {
    setCustosManutencao([...custosManutencao, {id: Date.now(), valor: 0}]);
  };

  const removerCustoManutencao = (id: number) => {
    if (custosManutencao.length > 1) {
      setCustosManutencao(custosManutencao.filter(custo => custo.id !== id));
    }
  };

  const atualizarCustoManutencao = (id: number, valor: number) => {
    setCustosManutencao(custosManutencao.map(custo => 
      custo.id === id ? {...custo, valor: parseFloat(valor.toString()) || 0} : custo
    ));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <img src="./logo.png" alt="Logo" style={{ width: '150px', marginBottom: '10px' }} />
      <h1 style={{ color: '#0f0' }}>Lucro de Corridas Para Decisões</h1>
      <button onClick={() => setShowModal(true)}>Cadastrar Dados do Veículo</button>

      {showModal && (
        <div className="modal" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2>Cadastro de Dados do Veículo</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Preço do Combustível (por litro):</label>
            <input 
              type="number" 
              value={precoCombustivel} 
              onChange={(e) => setPrecoCombustivel(parseFloat(e.target.value) || 0)} 
              style={{ width: '50%' }}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Kms/L feitos pelo veículo:</label>
            <input 
              type="number" 
              value={kmPorLitro} 
              onChange={(e) => setKmPorLitro(parseFloat(e.target.value) || 0)} 
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Valor do Seguro (por ano):</label>
            <input 
              type="number" 
              value={valorSeguro} 
              onChange={(e) => setValorSeguro(parseFloat(e.target.value) || 0)} 
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Custos de Manutenção (por ano):</label>
            {custosManutencao.map((custo) => (
              <div key={custo.id} style={{display: 'flex', marginBottom: '10px', alignItems: 'center'}}>
                <input 
                  type="number" 
                  value={custo.valor} 
                  onChange={(e) => atualizarCustoManutencao(custo.id, parseFloat(e.target.value))} 
                  required 
                  style={{ flex: 1 }}
                />
                {custosManutencao.length > 1 && (
                  <button 
                    onClick={() => removerCustoManutencao(custo.id)} 
                    style={{marginLeft: '10px', padding: '5px 10px'}}
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button 
              onClick={adicionarCustoManutencao}
              style={{ marginTop: '5px', padding: '5px 10px' }}
            >
              Adicionar Custo
            </button>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Kms rodados por dia (útil):</label>
            <input 
              type="number" 
              value={kmsPorDia} 
              onChange={(e) => setKmsPorDia(parseFloat(e.target.value) || 0)} 
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Valor Atual do Veículo:</label>
            <input 
              type="number" 
              value={valorVeiculo} 
              onChange={(e) => setValorVeiculo(parseFloat(e.target.value) || 0)} 
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
              borderRadius: '5px'
            }}
          >
            Salvar
          </button>
        </div>
      )}

      <div style={{ margin: '15px 0' }}>
        <label>Valor Pago na Corrida:</label>
        <input 
          type="number" 
          value={valorCorrida} 
          onChange={(e) => setValorCorrida(parseFloat(e.target.value) || 0)} 
        />
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <label>Quilômetros da Corrida:</label>
        <input 
          type="number" 
          value={kmsRodados} 
          onChange={(e) => setKmsRodados(parseFloat(e.target.value) || 0)} 
        />
      </div>

      <div style={{ margin: '15px 0' }}>
        <label>Lucro de Curto Prazo (desconta combustível):</label>
        <input type="text" value={lucroCurtoPrazo !== null ? `R$${lucroCurtoPrazo.toFixed(2)}` : ''} readOnly />
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <label>Lucro de Longo Prazo (desconta todos valores):</label>
        <input type="text" value={lucroLongoPrazo !== null ? `R$${lucroLongoPrazo.toFixed(2)}` : ''} readOnly />
      </div>

      <p>
        <strong>Obs.:</strong> Agora você pode adicionar múltiplos custos de manutenção! O cálculo somará todos eles automaticamente. Preencha qualquer número diferente de 0 em valor do seguro E manutenção para funcionar corretamente (incluir IPVA e demais custos). O valor do veículo serve como referência, pois calculamos uma depreciação de 3,33% ao ano para o lucro de longo prazo (em caso de aluguel colocar 1 ou um outro valor baixo). O lucro de curto prazo desconta apenas o combustível, enquanto o de longo prazo desconta todos os custos. Os KMs rodados por dia (útil) servem para diferir (espalhar) os custos anuais para cada corrida.
      </p>
    </div>
  );
}
