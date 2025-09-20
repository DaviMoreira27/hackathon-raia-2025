// Tela2.tsx

import React, { useState } from 'react';
import Header from './Header';
import VideoContainer from './VideoContainer';
import TextContainers from './TextContainer';
import './Tela2.css';

const fakeData = {
  afirmacoes: `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`,
  explicacao: `...`,
};

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : null;
}

function Tela2() {
  const [videoId, setVideoId] = useState<string>('dQw4w9WgXcQ');

  const handleUrlSubmit = (url: string) => {
    const newVideoId = getYouTubeId(url);
    if (newVideoId) {
      setVideoId(newVideoId);
    } else {
      alert("URL do YouTube inválida!");
    }
  };

  return (
    <div className="tela2-container">
      <Header onUrlSubmit={handleUrlSubmit} />
      
      {/* NOVO CONTAINER PARA O CONTEÚDO PRINCIPAL */}
      <div className="main-content-wrapper"> 
        <div className="main-content-row">
          <VideoContainer videoId={videoId} />
          <TextContainers 
            afirmacoesContent={fakeData.afirmacoes} 
            explicacaoContent={fakeData.explicacao} 
          />
        </div>
      </div>
    </div>
  );
}

export default Tela2;