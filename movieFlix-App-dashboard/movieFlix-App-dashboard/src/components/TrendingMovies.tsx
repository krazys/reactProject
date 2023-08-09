import React, { useEffect, useState,  startTransition } from 'react';
import '../../styles/trendingSection.scss';
import axios from 'axios';
import TrendingBlock from './TrendingBlock';
import { Link} from 'react-router-dom';
import { AiOutlineDoubleRight} from "react-icons/ai";
import {useNavigate} from 'react-router-dom';


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

const TrendingMovies = () => {
    const navigate = useNavigate();


    let [fetchedData, setFetchedData] = useState<Array<fetchedDataResponse>>([]);

    const trendingData = async () => {

        try {
            let response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=3e85d84a2d3e58168179cf80ecdecea5');
            setFetchedData(response?.data?.results);
            console.log(response)
        } catch (error) {
            console.log(error)

        }

    }

    const handleNavigation =( )=>{
        startTransition( ()=>{
            navigate('/movie');
        })
        
    }

    useEffect(() => {

        trendingData();
    }, []);

    return (
        <div className='trendingSection'>
               <div className='linkSection'><h4> Trending Movies</h4>
           {/* <Link to='/movie' ><button>Explore Movies <AiOutlineDoubleRight/></button></Link> */}
           <button onClick={handleNavigation}>Explore Movies <AiOutlineDoubleRight/></button>
           </div>
            <div className='movieBlock'>
                <TrendingBlock fetchedData={fetchedData}/>
            </div>

        </div>
    )

};

export default TrendingMovies;