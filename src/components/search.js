import React from 'react';
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
        backgroundColor: 'pink'
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

    function handleSubmit(event) {
        event.preventDefault();
        console.log('submit');
    }

    function handleChange(event) {

    }
    return ( 
        <div className={classes.root}>
            <form onSubmit={handleSubmit} autoComplete='off'>
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
                            />
                        </div>
                    </Grid>
                    <Grid item lg={4} xs={3}>
                        <Grid container justify='center'>
                            <Grid item lg={9} xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
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