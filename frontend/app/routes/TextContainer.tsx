import React from "react";
import "./TextContainer.css";

export type FactualMoment = {
  t: number;
  span?: [number, number];
  t_hms: string;
  span_hms?: [string, string];
  quote: string;
  kind: "quantitative" | "event" | "causal" | "categorical" | "other";
};

export type FactContext = {
  span?: [number, number];
  t_hms: string;
  quote: string;
  fonts: string[];
  confidence: string;
  synthesis: string;
};

interface TextContainersProps {
  afirmacoesContent: FactualMoment[];
  onSelectAfirmacao?: (afirmacao: FactualMoment) => void; // callback opcional
}

function formatSpan(span?: [number, number]) {
  if (!span) return "-";
  return `${span[0]}s${span[1] ? ` - ${span[1]}s` : ""}`;
}

function TextContainer({
  afirmacoesContent,
  onSelectAfirmacao,
}: TextContainersProps) {
  return (
    <div className="text-containers">
      <div className="box-container">
        <h3 className="box-title">Afirmações</h3>
        <div className="factual-buttons">
          {afirmacoesContent.map((afirmacao, index) => (
            <button
              key={index}
              className={`factual-button ${afirmacao.kind}`}
              title={afirmacao.quote}
              onClick={() => onSelectAfirmacao?.(afirmacao)}
            >
              {afirmacao.quote}{" "}
              <span className="timestamp">{formatSpan(afirmacao.span)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TextContainer;
