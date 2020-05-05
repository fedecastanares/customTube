import React, { createContext,useState } from 'react';

export const DataContext = createContext();

const DataProvider = (props) => {

    const [darkMode, setdarkMode] = useState(true);
    const [search, setsearch] = useState(null);
    const [idVideo, setidVideo] = useState('QNwhAdrdwp0');

    return ( 
        <DataContext.Provider
        value={{
            darkMode,
            search,
            idVideo,
            setsearch,
            setidVideo,
        }}>
            {props.children}
        </DataContext.Provider>
     );
}
 
export default DataProvider;