'use client';

import React, { useState, useEffect } from 'react';

export default function CalculoLucro() {
  const [precoCombustivel, setPrecoCombustivel] = useState(0);
  const [valorVeiculo, setValorVeiculo] = useState(0);
  const [valorSeguro, setValorSeguro] = useState(0);
  const [valorManutencao, setValorManutencao] = useState(0);
  const [kmPorLitro, setKmPorLitro] = useState(0);
  const [kmsPorDia, setKmsPorDia] = useState(0);
  const [valorCorrida, setValorCorrida] = useState(0);
  const [kmsRodados, setKmsRodados] = useState(0);
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState<number | null>(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    calcularLucros();
  }, [precoCombustivel, valorVeiculo, valorSeguro, valorManutencao, kmPorLitro, kmsPorDia, valorCorrida, kmsRodados]);

  const calcularLucros = () => {
    if ([precoCombustivel, valorVeiculo, valorSeguro, valorManutencao, kmPorLitro, kmsPorDia, valorCorrida, kmsRodados].some(val => val <= 0 || isNaN(val))) {
      setLucroCurtoPrazo(null);
      setLucroLongoPrazo(null);
      return;
    }

    const custoCombustivelPorKm = precoCombustivel / kmPorLitro;
    const custoCombustivelCorrida = custoCombustivelPorKm * kmsRodados;
    const lucroCurto = valorCorrida - custoCombustivelCorrida;
    setLucroCurtoPrazo(lucroCurto);

    const custoManutencaoCorrida = ((valorManutencao + valorSeguro) || (0.03333 * valorVeiculo)) * kmsRodados / (kmsPorDia * 252);
    const depreciaçãoVeiculo = (valorVeiculo * 0.03333 * kmsRodados) / (kmsPorDia * 252);
    const lucroLongo = valorCorrida - custoCombustivelCorrida - custoManutencaoCorrida - depreciaçãoVeiculo;
    setLucroLongoPrazo(lucroLongo);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <img src="./logo.png" alt="Logo" style={{ width: '150px', marginBottom: '10px' }} />
      <h1 style={{ color: '#0f0' }}>Calcular Lucro de Corrida (Todas Plataformas)</h1>
      <button onClick={() => setShowModal(true)}>Cadastrar Dados do Veículo</button>

      {showModal && (
        <div className="modal">
          <h2>Cadastro de Dados do Veículo</h2>
          <div>
            <label>Preço do Combustível (por litro):</label>
            <input type="number" value={precoCombustivel} onChange={(e) => setPrecoCombustivel(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Valor Atual do Veículo:</label>
            <input type="number" value={valorVeiculo} onChange={(e) => setValorVeiculo(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Valor do Seguro (por ano):</label>
            <input type="number" value={valorSeguro} onChange={(e) => setValorSeguro(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Valor de Manutenção (por ano):</label>
            <input type="number" value={valorManutencao} onChange={(e) => setValorManutencao(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Km/L feitos pelo veículo:</label>
            <input type="number" value={kmPorLitro} onChange={(e) => setKmPorLitro(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Kms rodados por dia (útil):</label>
            <input type="number" value={kmsPorDia} onChange={(e) => setKmsPorDia(parseFloat(e.target.value) || 0)} required />
          </div>
          <button onClick={() => setShowModal(false)}>Salvar</button>
        </div>
      )}

      <div>
        <label>Valor Pago na Corrida:</label>
        <input type="number" value={valorCorrida} onChange={(e) => setValorCorrida(parseFloat(e.target.value) || 0)} />
      </div>
      <div>
        <label>Quilômetros da Corrida:</label>
        <input type="number" value={kmsRodados} onChange={(e) => setKmsRodados(parseFloat(e.target.value) || 0)} />
      </div>

      <div>
        <label>Lucro de Curto Prazo (desconta combustível):</label>
        <input type="text" value={lucroCurtoPrazo !== null ? `R$${lucroCurtoPrazo.toFixed(2)}` : ''} readOnly />
      </div>
      <div>
        <label>Lucro de Longo Prazo (desconta todos valores):</label>
        <input type="text" value={lucroLongoPrazo !== null ? `R$${lucroLongoPrazo.toFixed(2)}` : ''} readOnly />
      </div>

      <p>
        <strong>Obs.:</strong> preencher qualquer número diferente de 0 em valor do seguro E manutenção para funcionar corretamente (incluir IPVA e demais custos dentro desses campos). O valor do veículo serve como referência, pois calculamos uma depreciação de 3,333% ao ano para o lucro de longo prazo (em caso de aluguel colocar 1 ou um outro valor baixo). O lucro de curto prazo desconta apenas o combustível, enquanto o de longo prazo desconta todos os custos. Os KMs rodados por dia (útil) servem para diferir (espalhar) os custos anuais para cada corrida. Dica: 0 à esquerda é desconsiderado (pode deixar). Se gostou e quiser contribuir fique à vontade PIX 100.980.686-60. Para entrar na comunidade Open Source falar no Facebook com Bernard Diniz Bracco ou Ehnov7id30. Instagram: bernard.bracco
      </p>
    </div>
  );
}
