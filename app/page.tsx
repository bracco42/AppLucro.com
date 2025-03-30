'use client';

import React, { useState, useEffect } from 'react';

export default function CalculoLucro() {
  // ... (o resto do código permanece igual até a parte do return)

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      {/* ... (código anterior permanece igual) ... */}

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

      {/* ... (o restante do código permanece igual) ... */}
    </div>
  );
}
