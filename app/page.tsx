'use client';

import React, { useState, useEffect } from 'react';

export default function CalculoLucro() {
  // ... (todos os estados anteriores permanecem iguais)

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff', minHeight: '100vh', position: 'relative' }}>
      {/* Logo Principal - Melhor resolução */}
      <img 
        src="/logo-removebg-preview.png" 
        alt="Logo" 
        style={{ 
          width: 'auto', 
          height: '80px', 
          maxWidth: '100%', 
          marginBottom: '10px',
          objectFit: 'contain'
        }} 
      />
      
      {/* Restante do conteúdo permanece igual */}
      <h1 style={{ color: '#0f0' }}>Calcular Lucro de Corrida (Todas Plataformas)</h1>
      <button onClick={() => setShowModal(true)}>Cadastrar Dados do Veículo</button>

      {/* ... (todo o conteúdo do modal e demais seções permanece igual) ... */}

      <p>
        <strong>Obs.:</strong> Agora você pode adicionar múltiplos custos de manutenção! O cálculo somará todos eles automaticamente. Preencha qualquer número diferente de 0 em valor do seguro E manutenção para funcionar corretamente (incluir IPVA e demais custos). O valor do veículo serve como referência, pois calculamos uma depreciação de 3,33% ao ano para o lucro de longo prazo (em caso de aluguel colocar 1 ou um outro valor baixo). O lucro de curto prazo desconta apenas o combustível, enquanto o de longo prazo desconta todos os custos. Os KMs rodados por dia (útil) servem para diferir (espalhar) os custos anuais para cada corrida.
      </p>

      {/* Logo Pequeno no rodapé */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        fontSize: '0.5rem',
        lineHeight: '0.5rem'
      }}>
        <img 
          src="/logo-removebg-preview.png" 
          alt="Mini Logo" 
          style={{ 
            width: '1em', 
            height: '1em',
            objectFit: 'contain',
            display: 'inline-block',
            verticalAlign: 'middle'
          }} 
        />
      </div>
    </div>
  );
}
