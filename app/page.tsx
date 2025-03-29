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

    const custoManutencaoCorrida = ((valorManutencao + valorSeguro) || (0.03 * valorVeiculo)) * kmsRodados / (kmsPorDia * 252);
    const depreciaçãoVeiculo = (valorVeiculo * 0.03 * kmsRodados) / (kmsPorDia * 252);
    const lucroLongo = valorCorrida - custoCombustivelCorrida - custoManutencaoCorrida - depreciaçãoVeiculo;
    setLucroLongoPrazo(lucroLongo);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  return (
    <div>
      <h1>Calcular Lucro de Corrida (Todas Plataformas)</h1>
      <button onClick={() => setShowModal(true)}>Cadastrar Dados do Veículo</button>

      {showModal && (
        <div className="modal">
          <h2>Cadastro de Dados do Veículo</h2>
          <div>
            <label>Preço do Combustível (por litro):</label>
            <input type="number" value={precoCombustivel} onChange={handleInputChange(setPrecoCombustivel)} required />
          </div>
          <div>
            <label>Valor do Veículo:</label>
            <input type="number" value={valorVeiculo} onChange={handleInputChange(setValorVeiculo)} required />
          </div>
          <div>
            <label>Valor do Seguro (por ano):</label>
            <input type="number" value={valorSeguro} onChange={handleInputChange(setValorSeguro)} required />
          </div>
          <div>
            <label>Valor de Manutenção (por ano):</label>
            <input type="number" value={valorManutencao} onChange={handleInputChange(setValorManutencao)} required />
          </div>
          <div>
            <label>Km/L feitos pelo veículo:</label>
            <input type="number" value={kmPorLitro} onChange={handleInputChange(setKmPorLitro)} required />
          </div>
          <div>
            <label>Kms rodados por dia:</label>
            <input type="number" value={kmsPorDia} onChange={handleInputChange(setKmsPorDia)} required />
          </div>
          <button onClick={() => setShowModal(false)}>Salvar</button>
        </div>
      )}

      <div>
        <label>Valor da Corrida:</label>
        <input type="number" value={valorCorrida} onChange={handleInputChange(setValorCorrida)} />
      </div>
      <div>
        <label>Quilômetros Rodados:</label>
        <input type="number" value={kmsRodados} onChange={handleInputChange(setKmsRodados)} />
      </div>
      <button onClick={calcularLucros}>Calcular Lucros</button>

      <div>
        <label>Lucro de Curto Prazo:</label>
        <input type="text" value={lucroCurtoPrazo !== null ? `R$${lucroCurtoPrazo.toFixed(2)}` : ''} readOnly />
      </div>
      <div>
        <label>Lucro de Longo Prazo:</label>
        <input type="text" value={lucroLongoPrazo !== null ? `R$${lucroLongoPrazo.toFixed(2)}` : ''} readOnly />
      </div>

      <p>
        <strong>Obs.:</strong> preencher qualquer número diferente de 0 em valor do seguro E manutenção para funcionar corretamente (incluir IPVA e demais custos dentro desses campos). O valor do veículo serve como referência, pois calculamos uma depreciação de 3,333% ao ano para o lucro de longo prazo (em caso de aluguel colocar 1 ou um outro valor baixo). O lucro de curto prazo desconta apenas o combustível, enquanto o de longo prazo desconta todos os custos. Os KMs rodados por dia (útil) servem para diferir (espalhar) os custos anuais para cada corrida. Dica: 0 à esquerda é desconsiderado (pode deixar).
      </p>
    </div>
  );
}
