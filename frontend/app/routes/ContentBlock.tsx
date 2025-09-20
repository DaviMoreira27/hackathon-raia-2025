import React from "react";
import ReactMarkdown from "react-markdown";
import "./ContentBlock.css";
import type { FactualMoment } from "./TextContainer";
import type { FactContext } from "./Header";

interface ContentBlockProps {
  content: FactualMoment | string | FactContext;
}

function ContentBlock({ content }: ContentBlockProps) {
  if (typeof content === "string") {
    return (
      <div className="content-block">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  // Detecta se é FactContext
  const isFactContext = (c: any): c is FactContext =>
    "fonts" in c && "confidence" in c && "synthesis" in c;

  return (
    <div className="content-block">
      <div className="timestamp">{content.t_hms}</div>

      {"span_hms" in content && content.span_hms && (
        <div className="span">
          {content.span_hms[0]} - {content.span_hms[1]}
        </div>
      )}

      {"span" in content && content.span && (
        <div className="span">
          {content.span[0]} - {content.span[1]}
        </div>
      )}

      <div className="quote">
        <ReactMarkdown>{content.quote}</ReactMarkdown>
      </div>

      {isFactContext(content) ? (
        <div className="fact-details">
          <div className="fonts">Fonts: {content.fonts.join(", ")}</div>
          <div className="confidence">Confidence: {content.confidence}</div>
          <div className="synthesis">{content.synthesis}</div>
        </div>
      ) : (
        <div className="kind-tag">{(content as FactualMoment).kind}</div>
      )}
    </div>
  );
}

export default ContentBlock;
