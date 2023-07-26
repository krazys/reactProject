import React from "react";
import Header from './Header';
import HeroBanner from "./HeroBanner";
import TrendingSection from "./TrendingSection";
import TrendingMovies from './TrendingMovies';
import TrendingShows from './TrendingShows';

import '../../styles/homePageWrapper.scss'

const HomePageWrappper =( )=>{

    return (
        <div className="homeWrapperContainer">
            <div>
                <Header/>
                <HeroBanner/>
                <TrendingSection/>
                <hr className="divider" />
                <TrendingMovies/>
                <hr className="divider" />
                <TrendingShows/>
            </div>
        </div>
    )

}

export default HomePageWrappper;