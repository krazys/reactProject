import React from "react";
import { Link } from "react-router-dom";

const PreDefinedPath= ( ) => {
    let arrPreFilled = [ "Home", "Mountain", "Beaches", "Bird", "Food"];

  return(  <div className="routerContainer">
    <h4>Prefilled Searches :</h4>
    {arrPreFilled.map((ele)=>{
    
       return( <Link to={ele=="Home" ? '/' :`/${ele}`}><button>{ele}</button></Link>
       )
    })}
              </div>
  )

}
 export default PreDefinedPath;