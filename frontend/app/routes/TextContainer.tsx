import React from 'react';
import ContentBlock from './ContentBlock';
import './TextContainer.css';

interface TextContainersProps {
  afirmacoesContent: string;
  explicacaoContent: string;
}

function TextContainer({ afirmacoesContent, explicacaoContent }: TextContainersProps) {
  return (
    <div className="text-containers">
      <div className="box-container">
        <h3 className="box-title">Afirmações</h3>
        <ContentBlock content={afirmacoesContent} />
      </div>
      
      <div className="box-container">
        <h3 className="box-title">Explicação</h3>
        <ContentBlock content={explicacaoContent} />
      </div>
    </div>
  );
}

export default TextContainer;