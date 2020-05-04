import React from 'react';
import {Button, TextField} from '@material-ui/core'

const Search = () => {

    function HandleSubmit(event) {
        event.preventDefault();
        console.log('submit');
    }
    return ( 
        <form onSubmit={HandleSubmit}>
            <TextField id="standard-basic" label="Standard" />
            <Button variant="contained" color="primary" type="submit">
                Primary
            </Button>
        </form>
     );
}
 
export default Search;