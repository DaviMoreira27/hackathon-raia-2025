import React, { useState } from "react";
import "./Header.css";

export type FactualMoment = {
  t: number; // segundo inicial (inteiro, arredondado p/ baixo)
  span?: [number, number]; // [start_s, end_s]
  t_hms: string; // "HH:MM:SS.mmm"
  span_hms?: [string, string]; // ["HH:MM:SS.mmm","HH:MM:SS.mmm"]
  quote: string;
  kind: "quantitative" | "event" | "causal" | "categorical" | "other";
};

export type FactContext = {
  span?: [number, number]; // [start_s, end_s]
  t_hms: string; // "HH:MM:SS.mmm"
  quote: string;
  fonts: string[];
  confidence: string;
  synthesis: string;
};

interface HeaderProps {
  onUrlSubmit: (url: string) => void;
  setTranscript: (data: FactualMoment[]) => void;
  setLoading: (loading: boolean) => void; // NOVO
}

// A ÚNICA definição do componente Header
function Header({ onUrlSubmit, setTranscript, setLoading }: HeaderProps) {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onUrlSubmit(url);

    try {
      setLoading(true); // começa o loader
      const response = await fetch(
        "http://localhost:3000/openai/facts/sections",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ youtubeLink: url }),
        },
      );

      if (!response.ok) {
        throw new Error(`Erro na rede: ${response.statusText}`);
      }

      const data: FactualMoment[] = await response.json();
      setTranscript(data);
    } catch (err: any) {
      throw new Error(err.message ?? "Or not");
    } finally {
      setLoading(false); // encerra o loader, sucesso ou erro
    }
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
