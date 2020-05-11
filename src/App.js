import React, { Fragment } from 'react';
import './App.css';
import DataProvider from './context/dataContext.js'



import Body from './components/body.js'

function App() {


  return (
    <Fragment>
      <DataProvider>
       <Body/>
      </DataProvider>
    </Fragment>
  );
}

export default App;
