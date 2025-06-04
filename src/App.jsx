//use of {debouncing in react on text}

// import React, {  useCallback, useState } from 'react'
// import _ from 'lodash';
// export default function App() {

//   const[state, setState]=useState("");
//    const [displayed, setDisplayed] = useState('');

//    const debouncedChangeHandler =useCallback(
//     _.debounce((value) => {
//       setDisplayed(value);
//     }, 1000), 
//     []
//   );

//   return (
//     <div>
//       <input value={state}
//       placeholder='enter something' 
//       onChange={(e)=>{
//         setState(e.target.value)
//         debouncedChangeHandler(e.target.value)
//       }}/>

//     <h1>name {displayed}</h1>
//     </div>
//   )
// }


import React, { useRef } from 'react'
import VideoPlayer from './VideoPlayer'

export default function App() {
  const playerRef = useRef(null)
  const videoLink = "http://localhost:3000/uploads/courses/b3d73953-cea8-48bd-bf2a-7e75b6cebf13/index.m3u8";
  //hard coded video link
  const videoPlayerOptions = { //all the options to play the video
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL" //to run the ffmpeg 
        //  adaptive bitrate streaming using .m3u8 playlists and .ts video segments
      }
    ]
  }
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <>
      <div>
        <h1>Video player</h1>
      </div>
      <VideoPlayer
      options={videoPlayerOptions}
      onReady={handlePlayerReady}
      />
    </>
  )
}
