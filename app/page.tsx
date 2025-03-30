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

  // ... rest of your component logic ...

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      {/* ... other components ... */}

      <div style={{ margin: '15px 0' }}>
        <label>Lucro de Curto Prazo (desconta combustível):</label>
        <input 
          type="text" 
          value={lucroCurtoPrazo !== null ? `R$${lucroCurtoPrazo.toFixed(2)}` : ''} 
          readOnly 
          style={{ 
            backgroundColor: '#0f0',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            padding: '5px',
            borderRadius: '4px'
          }}
        />
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <label>Lucro de Longo Prazo (desconta combustível e todos custos atribuídos à corrida):</label>
        <input 
          type="text" 
          value={lucroLongoPrazo !== null ? `R$${lucroLongoPrazo.toFixed(2)}` : ''} 
          readOnly 
          style={{ 
            backgroundColor: '#0f0',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            padding: '5px',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* ... rest of your JSX ... */}
    </div>
  );
}
