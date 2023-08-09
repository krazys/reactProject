import React, { useEffect, useState } from 'react';
import '../../styles/trendingSection.scss';
import axios from 'axios';
import TrendingBlock from './TrendingBlock';
import {Link} from 'react-router-dom';
import { AiOutlineDoubleRight} from "react-icons/ai";

interface fetchedDataResponse {
    title:string,
    overview:string,
    vote_average:number,
    release_date: string,
    media_type:string,
    adult:boolean,
    poster_path:string,
    first_air_date:string,
    name:string,
    id: number,
    genre_ids: Array<number>,
    popularity:number, 
    vote_count:number,
}
const TrendingSection = () => {

    let [fetchedData, setFetchedData] = useState<Array<fetchedDataResponse>>([]);


    const trendingData = async () => {

        try {
            let response = await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=3e85d84a2d3e58168179cf80ecdecea5"
            )
            setFetchedData(response?.data?.results);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        trendingData();

    }, []);


    return (
        <div className='trendingSection'>
                 <div className='linkSection'><h4> Trending Today</h4>
           <Link to="/trending" ><button>Explore Today  <AiOutlineDoubleRight/></button></Link></div>
            <div className='movieBlock'>
<TrendingBlock fetchedData={fetchedData}/>
            </div>
        </div>
    )
}

export default TrendingSection;