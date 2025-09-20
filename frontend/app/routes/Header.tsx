import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  onUrlSubmit: (url: string) => void;
}

// A ÚNICA definição do componente Header
function Header({ onUrlSubmit }: HeaderProps) {
  const [url, setUrl] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUrlSubmit(url);
  };

  return (
    <header className="page-header">
      <form className="url-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Cole a URL do vídeo do YouTube aqui..."
          className="url-input"
        />
        <button type="submit" className="submit-button">
          Carregar Vídeo
        </button>
      </form>
    </header>
  );
}

// A ÚNICA exportação do componente
export default Header;