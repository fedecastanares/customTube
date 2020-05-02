import React, { Fragment } from 'react';
import YoutubeVideo from './youtube.js';
import {Container} from '@material-ui/core';

const Body = () => {


    function Content() {
        if (window.innerWidth > 768) {
            return(
                <Container>
                    <YoutubeVideo/>
                </Container>
            )
        } else {
            return (
                <YoutubeVideo/>
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