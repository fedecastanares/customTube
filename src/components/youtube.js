import React, { Fragment } from 'react';
import YouTube from 'react-youtube';


const YoutubeVideo = () => {

    
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    return ( 
        <Fragment>
            <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} />
        </Fragment>
     );
}
 
export default YoutubeVideo;