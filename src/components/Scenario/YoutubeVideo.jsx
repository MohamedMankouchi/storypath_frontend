import React from "react";

const YoutubeVideo = ({ videoId }) => {
  let video_id = videoId.split("v=")[1];
  if (video_id == undefined) {
    video_id = "py53-Lz2aS0";
  } else {
    let ampersandPosition = video_id.indexOf("&");

    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
  }
  const src = `https://www.youtube.com/embed/${video_id}?rel=0`;

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
