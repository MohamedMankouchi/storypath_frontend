import React from 'react';

const YoutubeVideo = ({ videoId }) => {
  const src = `https://www.youtube.com/embed/${videoId}?rel=0`;

  return (
    <iframe
      width="450"
      height="253"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YoutubeVideo;
