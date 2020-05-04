import React, { Fragment } from 'react';
import YoutubeVideo from './youtube.js';
import Search from './search.js'
import {Container} from '@material-ui/core';


const Body = () => {

    
    function Content() {
        if (window.innerWidth > 768) {
            return(
                <Container>
                    <Search/>
                    <YoutubeVideo/>
                </Container>
            )
        } else {
            return (
                <Fragment>
                    <Search/>
                    <YoutubeVideo/>
                </Fragment>
            )
        }
    }



    return ( 
        <Fragment>
            <Content/>
        </Fragment>
     );
}
 
export default Body;