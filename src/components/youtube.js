import React, { Fragment , useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import {Skeleton} from '@material-ui/lab'
import {Grid, Container } from '@material-ui/core'

const KEY = '';
const baseURL = 'https://www.googleapis.com/youtube/v3';

const YoutubeVideo = () => {

    const [videos, setvideos] = useState(null);
    const idVideo = 'QNwhAdrdwp0';

    useEffect(() => {
        const getData = async () =>{
            const primaryVideo = await axios.get(baseURL + '/videos', {
                params: {
                    id: idVideo,
                    key: KEY,
                    part: 'snippet'
                }
            })
            const relatedVideo = await axios.get(baseURL + '/search', {
                params: {
                    relatedToVideoId: idVideo,
                    key: KEY,
                    part: 'snippet',
                    type: 'video',
                    maxResults: 4
                }})
            setvideos([{ 
                primary: primaryVideo.data,
                related: relatedVideo.data
            }]);
        }
        getData();
    }, [])



    // opts primario
    const opts = {
        height:  window.innerWidth > 768 ? '480' : '240',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };
    
    const optsRelated = {
      height: '155',
      width: '100%',
    };


    if (videos !== null ) {
        return ( 
            <Fragment>
                <Grid container spacing={2}>
                    <Grid item lg={8} xs={12}>
                        <YouTube videoId={videos[0].primary.items[0].id} opts={opts}  />
                        <Container>
                            <h3>{videos[0].primary.items[0].snippet.title}</h3>
                            <p>{videos[0].primary.items[0].snippet.description}</p>
                        </Container>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Grid container spacing={1} direction="column" justify='center' alignContent='center' alignItems='center'>
                            {videos[0].related.items.map( video => (
                                // Agregar key para el map
                                // Agregar onClick nuevo state de videos, primero que reproduzca y despues que cargue
                                <Grid item>
                                    <YouTube videoId={video.id.videoId} opts={optsRelated}  />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Skeleton variant="rect" width={opts.width} height={opts.height} animation="wave"/>
                <Skeleton animation="wave"/>
                <Skeleton width="60%" animation="wave"/>
            </Fragment>
       )
       // Agregar skeleto de los relacionados
    }
}
 
export default YoutubeVideo;