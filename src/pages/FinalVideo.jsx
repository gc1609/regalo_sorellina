import { useEffect, useRef } from "react";

function FinalVideo({ urlVideo }) {

  const videoRef = useRef(null);

  useEffect(() => {

    const video = videoRef.current;

    if (video) {

      video.play();

      if (video.requestFullscreen) {
        video.requestFullscreen();
      }

    }

  }, []);

  return (

    <div className="videoPage">

      <video
        ref={videoRef}
        src={urlVideo}
        controls
        className="videoPlayer"
      />

    </div>

  );

}

export default FinalVideo;
