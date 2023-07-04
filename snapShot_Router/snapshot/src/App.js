import React from "react";
import './App.css';
import SearchGrid from './Components/SearchGrid';
import { Routes,  Route } from "react-router-dom";
import PreDefinedPath from './Components/PreDefinedPath';
import PreDefinedGrid from "./Components/PredefinedGrid";

function App() {
  return (
    
    <div className="App">
    <PreDefinedPath />
      {/* <SearchGrid/> */}
   
<div className="routePath">
<Routes>
  <Route  path="/" element={ <SearchGrid/>}/>
      <Route path="/Mountain" element={<PreDefinedGrid textValue="mountain"/>}/>
      <Route path="/Beaches" element={<PreDefinedGrid textValue="beaches"/> }/>
      <Route path="/Bird" element={<PreDefinedGrid textValue="bird"/>}/>
      <Route path="/Food" element={<PreDefinedGrid textValue="food"/> }/>
      </Routes>  
    </div>
    </div>
  
  );
}

export default App;
