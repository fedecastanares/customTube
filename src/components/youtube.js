import React, { Fragment , useState, useEffect, useContext } from 'react';
import {DataContext} from '../context/dataContext.js'
import YouTube from 'react-youtube';
import axios from 'axios';
import {Skeleton} from '@material-ui/lab'
import {Grid, Container, Typography, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({ 
    videoSkeleton: {
        height: '100%',
        color: theme.palette.contrast
     },
    relatedVideo:{
        marginTop: '5vh',
        marginBottom: '5vh',
        [theme.breakpoints.up('sm')]:{
            margin: 0,
        }
    }
}));

const YoutubeVideo = () => {

    
    const classes = useStyles();
    const {idVideo, KEY, baseURL, loading, setloading} = useContext(DataContext);

    const [videos, setvideos] = useState(null);
    

    useEffect(() => {
        if (idVideo !== undefined && idVideo !== '') {
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
                        maxResults: 3
                    }})
                setvideos([{ 
                    primary: primaryVideo.data,
                    related: relatedVideo.data
                }]); 
            }
            getData();
            setloading(false)
        }
    }, [idVideo])

    const handlePlay = event => {
        console.log(event);
    }


    const opts = {
        height:  window.innerWidth > 768 ? '480' : '240',
        width: '100%',
        playerVars: {
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
                        <Grid container className={classes.relatedVideo} spacing={1} direction="column" justify='center' alignContent='center' alignItems='center'>
                            {videos[0].related.items.map( video => (
                                    // Agregar onClick nuevo state de videos, primero que reproduzca y despues que cargue
                                    <Grid item key={video.id.videoId}>
                                        <YouTube videoId={video.id.videoId} opts={optsRelated} id={video.id.videoId} onPlay={handlePlay}/>
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
                <Grid container spacing={2}>
                    <Grid item lg={8} xs={12}>
                        <Skeleton variant="rect" width={opts.width} height={opts.height + 'px'} animation="wave">
                            <Grid className={classes.videoSkeleton} container justify='center' alignContent='center' alignItems='center'>
                                {loading === false && idVideo === '' ? 
                                <Typography>
                                    Search something
                                </Typography> : 
                                <CircularProgress color="primary" /> 
                                }
                            </Grid>
                        </Skeleton>
                        <br/>
                        <Container>
                            <Skeleton animation="wave"/>
                            <br/>
                            <Skeleton  animation="wave"/>
                            <Skeleton  animation="wave"/>
                            <Skeleton width="60%" animation="wave"/>
                        </Container>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Grid container className={classes.relatedVideo} spacing={1} direction="column" justify='center' alignContent='center' alignItems='center'>
                            <Skeleton variant="rect" width={'70%'} height={optsRelated.height + 'px'} animation="wave"/>
                            <br/>
                            <Skeleton variant="rect" width={'70%'} height={optsRelated.height + 'px'} animation="wave"/>
                            <br/>
                            <Skeleton variant="rect" width={'70%'} height={optsRelated.height + 'px'} animation="wave"/>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
       )
    }
}
 
export default YoutubeVideo;
