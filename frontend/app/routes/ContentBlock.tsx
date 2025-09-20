import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ContentBlock.css';

interface ContentBlockProps {
  content: string;
}

function ContentBlock({ content }: ContentBlockProps) {
  return (
    <div className="content-block">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default ContentBlock;