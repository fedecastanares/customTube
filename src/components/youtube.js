import React, { Fragment , useState, useEffect, useContext } from 'react';
import {DataContext} from '../context/dataContext.js'
import YouTube from 'react-youtube';
import {Skeleton} from '@material-ui/lab'
import {Grid, Container,  CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {videosRequest} from '../api/youtubeRequests.js'



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
    },
    space:{
        paddingTop: '1rem'
    }
}));

const YoutubeVideo = () => {

    
    const classes = useStyles();
    const {idVideo, loading, setloading, setidVideo} = useContext(DataContext);

    const [videos, setvideos] = useState(null);
    

    useEffect(() => {
        if (idVideo !== undefined && idVideo !== '') {
            const getData = async () =>{
                const videos = await videosRequest(idVideo);
                setvideos(videos);
            }
            getData();
            setloading(false)
        }
    }, [idVideo])

    const handleStateChange = event => {
        if ( event.target.g.g.videoId !== idVideo) {
            setidVideo(event.target.g.g.videoId);
        }
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


    if (  loading === false && videos !== null ? videos[0].primary.items[0].id === idVideo : 1 === 2) {
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
                            {videos[0].related.items.map( (video, i) => (
                                    i < 3 ?
                                    <Grid item key={video.id.videoId} lg={9} xs={12}>
                                        <YouTube videoId={video.id.videoId} opts={optsRelated} id={video.id.videoId} onStateChange={handleStateChange} />
                                    </Grid> :
                                    null
                                ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        );
    } else {
        
        if (idVideo === '') {
            return ( <Fragment/> )    
        } else {
        return (
            <Fragment>
                <Grid container spacing={2}>
                    <Grid item lg={8} xs={12}>
                        <Skeleton variant="rect" width={opts.width} height={opts.height + 'px'} animation="wave">
                            <Grid className={classes.videoSkeleton} container justify='center' alignContent='center' alignItems='center'>
                                <CircularProgress color="primary" /> 
                            </Grid>
                        </Skeleton>
                        <div className={classes.space}></div>
                        <Container>
                            <Skeleton animation="wave"/>
                            <div className={classes.space}></div>
                            <Skeleton  animation="wave"/>
                            <Skeleton  animation="wave"/>
                            <Skeleton width="60%" animation="wave"/>
                            
                        </Container>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Grid container className={classes.relatedVideo} spacing={1} direction="column" justify='center' alignContent='center' alignItems='center'>
                            <Skeleton variant="rect" width={'70%'} height={optsRelated.height + 'px'} animation="wave"/>
                            <div className={classes.space}></div>
                            <Skeleton variant="rect" width={'70%'} height={optsRelated.height + 'px'} animation="wave"/>
                            <div className={classes.space}></div>
                            <Skeleton variant="rect" width={'70%'} height={optsRelated.height + 'px'} animation="wave"/>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
       )
    }
    }
}
 
export default YoutubeVideo;
