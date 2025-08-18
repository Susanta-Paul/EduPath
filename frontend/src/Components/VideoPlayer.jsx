import { useEffect, useRef, useState } from "react";
import videojs from "video.js"
import "video.js/dist/video-js.css"
import "videojs-contrib-quality-levels"
import "videojs-http-source-selector"
import httpSourceSelector from "videojs-http-source-selector";

videojs.registerPlugin("httpSourceSelector", httpSourceSelector);

export default function VideoPlayer({videoUrl}) {

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.25, 0.5, 1, 1.5, 2],
    sources: [{
      src: `${videoUrl}/ik-master.m3u8?tr=sr-240_360_480_720_1080`,
      type: 'application/x-mpegURL'
    }]
  };

  const onReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  useEffect(()=>{
    if(!videoRef){return}

    if(!playerRef.current){
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("video-js", "vjs-big-play-centered", "vjs-fluid");

      videoRef.current.appendChild(videoElement)

      const player = playerRef.current = videojs(videoElement, videoJsOptions, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

      console.log(player)

      player.ready(()=>{
        if(typeof player.httpSourceSelector==="function"){
          player.httpSourceSelector({
            default: "auto"
          });
        }
      })

      playerRef.current=player

    }

  }, [onReady, videoJsOptions])

  useEffect(()=>{
    return ()=>{
        if (playerRef.current && playerRef.current.isDisposed()) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      }
  },[])

  return (
    <div data-vjs-player className="w-full max-w-4xl">
      <div ref={videoRef} className="w-full h-auto" />
    </div>
    );
}
