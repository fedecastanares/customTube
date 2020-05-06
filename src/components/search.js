import React, { useContext } from 'react';
import axios from 'axios'
import {DataContext} from '../context/dataContext.js'

import {Button, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({ 
    root: {
        paddingTop: '1vh',
        paddingBottom: '2vh',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '3vh',
            paddingBottom: '5vh',
          },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.contrast,
        [theme.breakpoints.up('sm')]: {
          marginLeft: 0,
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.dark
      },
      inputRoot: {
        width: '100%',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        color: theme.palette.dark
      },
}));

const Search = () => {

    const classes = useStyles();
    const {search, setsearch, baseURL, KEY, setidVideo, setloading } = useContext(DataContext);

    const handleSubmit = event => {
        event.preventDefault();
        setloading(true);
        const getId = async () =>{
            const video = await axios.get(baseURL + '/search', {
                params: {
                    q: search, 
                    key: KEY,
                    part: 'snippet',
                    maxResults: 1,
                    type: 'video'
                }
            })
            setidVideo(video.data.items[0].id.videoId);
        }
        getId();
    }

    const handleChange =(event) => {
        setsearch(event.target.value);
    }
    return ( 
        <div className={classes.root}>
            <form  autoComplete='off'  onSubmit={handleSubmit}>
                <Grid container spacing={2} justify='center' alignContent='center' alignItems='center'>
                    <Grid item lg={8} xs={8}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Search.. &nbsp;&nbsp;&nbsp;"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        name='search'
                        onChange={handleChange}
                        value={search}
                        />
                        </div>
                    </Grid>
                    <Grid item lg={4} xs={3}>
                        <Grid container justify='center'>
                            <Grid item lg={9} xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth style={{marginTop:'0.1vh'}}>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
     );
}
 
export default Search;