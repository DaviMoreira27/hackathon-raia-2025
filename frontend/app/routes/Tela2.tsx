// Tela2.tsx

import React, { useEffect, useState } from "react";
import Header, { type FactContext } from "./Header";
import VideoContainer from "./VideoContainer";
import TextContainers, { type FactualMoment } from "./TextContainer";
import "./Tela2.css";

function getYouTubeId(url: string): string | null {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

function Tela2() {
  const [videoId, setVideoId] = useState<string>("dQw4w9WgXcQ");
  const [factualData, setFactualData] = useState<FactualMoment[]>([]);
  const [contextData, setCtxData] = useState<FactContext[]>([]);
  const [selected, setSelected] = useState<FactualMoment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUrlSubmit = (url: string) => {
    const newVideoId = getYouTubeId(url);
    if (newVideoId) {
      setVideoId(newVideoId);
    } else {
      alert("URL do YouTube inválida!");
    }
  };

  const handleTranscript = (data: FactualMoment[]) => {
    console.log("DATA", (data as any).moments);
    setFactualData((data as any).moments);
  };

  useEffect(() => {
    const fetchContext = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/openai/test/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ facts: selected }),
        });

        setLoading(false);
        if (!response.ok) {
          throw new Error("Erro na requisiçsetLoadingão");
        }

        const data: FactContext[] = await response.json();
        setCtxData((data as any).information);
      } catch (err) {
        setLoading(false);
        console.error("Erro ao buscar contexto:", err);
        setCtxData([]);
      }
    };

    if (selected) {
      console.log("zbim");
      fetchContext();
    } else {
      setCtxData([]);
    }
  }, [selected]);

  return (
    <div className="tela2-container">
      <Header
        onUrlSubmit={handleUrlSubmit}
        setTranscript={handleTranscript}
        setLoading={setLoading}
      />

      {/* Loader overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

      <div className="main-content-wrapper">
        <div className="main-content-row">
          <div className="video-with-explanation">
            <VideoContainer videoId={videoId} />

            {contextData.map((ctx, idx) => {
              const confidenceClass = `confidence-${ctx.confidence.toLowerCase()}`;
              return (
                <div key={idx} className="explanation-block">
                  <p className="explanation-quote">"{ctx.quote}"</p>
                  <p className={`explanation-confidence ${confidenceClass}`}>
                    <strong>Confiança:</strong> {ctx.confidence}
                  </p>
                  <p className="explanation-synthesis">{ctx.synthesis}</p>
                  <p className="explanation-fonts">
                    <strong>Fontes:</strong>{" "}
                    {ctx.fonts.join(", ").length > 0
                      ? ctx.fonts.join(", ")
                      : "Nenhuma fonte disponível"}
                  </p>
                </div>
              );
            })}
          </div>

          <TextContainers
            afirmacoesContent={factualData}
            onSelectAfirmacao={setSelected}
          />
        </div>
      </div>
    </div>
  );
}

export default Tela2;
