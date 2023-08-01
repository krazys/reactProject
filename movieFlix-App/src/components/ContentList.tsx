import React, { useEffect, useState } from 'react';
import { img_300 } from '../config/config';
import '../../styles/contentList.scss';

interface movieRepsonse {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    adult: boolean,
    name?:string,
    media_type:string,
    first_air_date?:string,

    overview: string,
    genre_ids: Array<number>,    
    popularity:number,
    vote_count:number,
}
type ContentListProps = {
    movieList: Array<movieRepsonse>,
    movie?:string,
    tv?:string,
}
const ContentList:React.FC<ContentListProps> = ({movieList, movie, tv}) => {

    const capitalizeFirstLetter = (str: string) => {
        let x = str.charAt(0).toUpperCase() + str.slice(1);
        console.log(x)
        return x;
    };

    return (
        <div className='contentListWrapper'>

            {movieList.map((ele, index) => {
                return (
                    <div className='individualBlockElem' key={index} 
                    // onClick={() => openmoreInfoModal(index, index)}
                    >
                        <div className='topSection'>
                            <img width={284} height={200} src={`${img_300}${ele.poster_path}`} alt={ele.title} />
                        </div>
                        <div className='rating'>{Math.round(ele.vote_average * 10) / 10} </div>
                        <div className='bottomSection'>
                            <h3>
                                {(tv === 'tv') ? (ele?.name) : capitalizeFirstLetter(ele.title)}
                            </h3>
                            <div className='movieInfo'>
                                {/* <p>{capitalizeFirstLetter(ele.media_type)} </p> */}
                                <p> {(tv === 'tv') ? ele.first_air_date : ele.release_date} </p>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
export default ContentList;