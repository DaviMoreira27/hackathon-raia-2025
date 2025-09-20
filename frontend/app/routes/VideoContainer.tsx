import React from 'react';
import './VideoContainer.css';

// Definição da interface para as props do componente
interface VideoContainerProps {
  videoId: string;
}

// O componente agora recebe as props com o tipo definido
function VideoContainer({ videoId }: VideoContainerProps) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;

  return (
    <div className="video-container">
      <iframe
        className="video-player"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoContainer;