import React, { createContext, useState } from 'react';


export const DataContext = createContext();

const DataProvider = (props) => {

    const KEY = 'AIzaSyAIfceSqlvQFE8gXX2CimVCytuqu1TZzsY';
    const baseURL = 'https://www.googleapis.com/youtube/v3';

    const [darkMode, setdarkMode] = useState(true);
    const [search, setsearch] = useState('');
    const [idVideo, setidVideo] = useState('');
    const [loading, setloading] = useState(false);
    

    return ( 
        <DataContext.Provider
        value={{
            KEY,
            baseURL,
            darkMode,
            search,
            idVideo,
            loading,
            setsearch,
            setidVideo,
            setloading
        }}>
            {props.children}
        </DataContext.Provider>
     );
}
 
export default DataProvider;