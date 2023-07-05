import React from "react";
import Header from './Header';
import HeroBanner from "./HeroBanner";

const HomePageWrappper =( )=>{

    return (
        <div className="homeWrapperContainer">
            <div>
                <Header/>
                <HeroBanner/>
            </div>
        </div>
    )

}

export default HomePageWrappper;