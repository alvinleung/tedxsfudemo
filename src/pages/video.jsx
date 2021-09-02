import React from "react";
import VideoPlayer from "../components/videoPlayer/VideoPlayer";

const video = () => {
  return (
    <div className="relative flex items-stretch w-screen h-screen overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-10 md:h-64 z-20 shade-from-top" />
      <VideoPlayer className="w-screen" src={"/videos/candida@1920.mp4"} />
    </div>
  );
};

export default video;