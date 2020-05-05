import React, { Fragment, useContext } from 'react';
import YoutubeVideo from './youtube.js';
import Search from './search.js'
import {DataContext} from '../context/dataContext.js'
import {Container, Paper} from '@material-ui/core';
import {  ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const Body = () => {

    const {darkMode} = useContext(DataContext);

    const theme = createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
          primary: {
            main: '#c00',
          },
          secondary: {
            main: '#3ea6ff'
          },
          contrast:  darkMode ? '#f5f5f5' : '#424242',
          dark:  darkMode ? '#424242' :  '#f5f5f5',
        }
      })

      


    if (window.innerWidth > 768) {
        return ( 
            <Fragment>
                <ThemeProvider theme={theme}>
                    <Paper elevation={0} style={{minHeight: '100vh'}}>
                        <Container>
                            <Search/>
                            <YoutubeVideo/>
                        </Container>
                    </Paper>
                </ThemeProvider>
            </Fragment>
         );
    } else {
        return ( 
            <Fragment>
                <ThemeProvider theme={theme}>
                    <Paper elevation={0} style={{minHeight: '100vh'}}>
                            <Search/>
                            <YoutubeVideo/>
                    </Paper>
                </ThemeProvider>
            </Fragment>
         );
    }
}
 
export default Body;