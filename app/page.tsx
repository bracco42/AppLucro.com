'use client';

import React, { useState, useEffect } from 'react';

export default function CalculoLucro() {
  const [precoCombustivel, setPrecoCombustivel] = useState<number>(5);
  const [kmPorLitro, setKmPorLitro] = useState<number>(35);
  const [valorSeguro, setValorSeguro] = useState<number>(2000);
  const [custosManutencao, setCustosManutencao] = useState<{id: number, valor: number}[]>([{id: 1, valor: 20000}]);
  const [KmPorDia, setKmPorDia] = useState<number>(250);
  const [valorVeiculo, setValorVeiculo] = useState<number>(15000);
  const [valorCorrida, setValorCorrida] = useState<number>(15);
  const [KmRodados, setKmRodados] = useState<number>(10);
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState<number | null>(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    calcularLucros();
  }, [precoCombustivel, kmPorLitro, valorSeguro, custosManutencao, KmPorDia, valorVeiculo, valorCorrida, KmRodados]);

  const calcularLucros = () => {
    if ([precoCombustivel, kmPorLitro, valorSeguro, KmPorDia, valorVeiculo, valorCorrida, KmRodados].some(val => val <= 0 || isNaN(val))) {
      setLucroCurtoPrazo(null);
      setLucroLongoPrazo(null);
      return;
    }

    const custoCombustivelPorKm = precoCombustivel / kmPorLitro;
    const custoCombustivelCorrida = custoCombustivelPorKm * KmRodados;
    const lucroCurto = valorCorrida - custoCombustivelCorrida;
    setLucroCurtoPrazo(lucroCurto);

    const totalManutencaoAnual = custosManutencao.reduce((total, custo) => total + custo.valor, 0);
    
    const custoManutencaoCorrida = ((totalManutencaoAnual + valorSeguro) || (0.0333 * valorVeiculo)) * KmRodados / (KmPorDia * 252);
    const depreciaçãoVeiculo = (valorVeiculo * 0.0333 * KmRodados) / (KmPorDia * 252);
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
      <h1 style={{ color: '#0f0' }}>Lucros de Corridas Para Decisões</h1>
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
            <label>Km/L feitos pelo veículo:</label>
            <input 
              type="number" 
              value={kmPorLitro} 
              onChange={(e) => setKmPorLitro(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Valor do Seguro (por ano):</label>
            <input 
              type="number" 
              value={valorSeguro} 
              onChange={(e) => setValorSeguro(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
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
                  style={{ flex: 1, padding: '5px' }}
                />
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
            <label>Km/Mi rodados por dia (útil):</label>
            <input 
              type="number" 
              value={KmPorDia} 
              onChange={(e) => setKmPorDia(parseFloat(e.target.value) || 0)} 
              style={{ marginLeft: '10px', padding: '5px' }}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Valor Atual do Veículo (deprecia 3.33% no ano):</label>
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
        <label>Valor Pago na Corrida:</label>
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
        <strong style={{ color: '#0f0' }}>Obs.:</strong> Agora você pode adicionar múltiplos custos de manutenção! O cálculo somará todos eles automaticamente. Precisa incluir imposto, óleo, etc. (ao ano) no valor da manutenção. O valor atual do veículo serve para calcular uma depreciação de 3.33% (em caso de aluguar o automóvel, ou se preferir informar esse custo ao ano, colocar 1 ou qualquer outro valor baixo para desconsiderar esse cálculo de depreciação). O lucro de curto prazo desconta apenas o combustível, enquanto o de longo prazo desconta esse e todos os outros. Os Km rodados por dia útil servem para dividir os custos anuais para cada corrida (portanto se trabalhar mais que 5x na semana considerar um valor maior nesse campo, por exemplo). A distância pode ser informada em qualquer medida (Km,Mi,Ft), contanto que sempre na mesma. OpenSource instagram:bernard.bracco PIX para contribuições voluntárias 100.980.686-60. Custos até então 4 semanas de mão de obra minha, 60 reais do domínio applucro.com e 30 reais do Heroku, anuais, receita até então: 0. Código aberto, comunidade a ser criada, falar no instagram e Facebook: Bernard Diniz Bracco; ou Ehnov7id30
      </p>
    </div>
  );
}
