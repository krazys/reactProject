import React, {useEffect, useState} from 'react';
import TrendingBlock from './TrendingBlock';
import axios from 'axios';

interface fetchedDataResponse{
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
}

const TrendingShows= ( )=>{

    let [fetchedData, setFetchedData] = useState<Array<fetchedDataResponse>>([]);


    const  trendingData = async ()=>{


        try{
            let response = await axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=3e85d84a2d3e58168179cf80ecdecea5')

            setFetchedData(response?.data?.results)
        }catch(error){

        }
    }
    

    useEffect(( )=>{
        trendingData();
    }, []);


    return(
        <div className='trendingSection'>
        <h4> Trending Shows</h4>
        <div className='movieBlock'>
            <TrendingBlock fetchedData={fetchedData}/>
        </div>

    </div>
    )
}

export default TrendingShows;