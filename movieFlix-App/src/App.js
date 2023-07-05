import React from 'react';
import './App.css';
import   AppLayoutContextWrapper from './components/AppLayoutContextWrapper';
import HomePageWrappper from './components/HomePageWrapper';

const App =( )=>{
return(
    <AppLayoutContextWrapper>
<HomePageWrappper />
        </AppLayoutContextWrapper>
)
};

export default App;