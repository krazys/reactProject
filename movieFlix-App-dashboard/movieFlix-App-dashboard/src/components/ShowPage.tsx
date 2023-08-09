import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import '../../styles/moviePage.scss';
import ContentList from "./ContentList";
// import ReactPaginate from 'react-paginate';

interface showRepsonse {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    adult: boolean,
    name?:string,
    media_type: string,
    first_air_date?: string,
    
    overview: string,
    genre_ids: Array<number>,    
    popularity:number,
    vote_count:number,
}

type ShowProps ={
tv:string;
}

const ShowPage:React.FC<ShowProps> = ({tv}) => {

    let [movieList, setMovieList] = useState<Array<showRepsonse>>([]);
    // let [filterNameSelected, setFilterNameSelected] = useState<string>('now_playing');
    let [page, setPage] = useState<number>(1);
    let [startNum, setStartNum] = useState<number>(1);
    let [lastNum, setlastNum] = useState<number>(10);
    let [newArr, setNewArr] = useState<Array<number>>([]);
    let [genreUrl, setGenreUrl] = useState<string>('');

    let numberArr: any = [];

    const generateNum = (a: number, b: number) => {

        for (let i = a; i < b; i++) {
            numberArr.push(i);
            console.log( a, b, i,'genearted2');
        }

        setNewArr(numberArr);

    }
    console.log(numberArr)
    const pageClick = (ele: any) => {
        let num = Number(ele.target.textContent);
        setPage(num);


    }
    console.log(page, 'page');

    const initialNumGenerator = ( )=>{
        setlastNum(lastNum+10);
        setStartNum(lastNum);
        setPage(lastNum);
    }
    const previousNumGenerator = ( )=>{
        setlastNum(lastNum-10);
        if (startNum !=10 ){
            setStartNum(startNum-10);
        } else{
            setStartNum(startNum-9);
        }
        
        setPage(lastNum-11);
    }

    console.log(startNum, 'startNum');
    console.log(lastNum, 'lastNum');



    const movieListFetch = async () => {
        try {


            let response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=3e85d84a2d3e58168179cf80ecdecea5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreUrl}`)
            console.log(response)

            setMovieList(response?.data.results)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        movieListFetch();
        generateNum(startNum, lastNum);
    }, [page, startNum, lastNum]);

    useEffect(()=>{

    }, [])

   

    return (
        <div>
            <Header />
            <div className='MovieWrapper'>
                <div className='filterSection'>
                    {/* <h2>{filterNameSelected} Movie</h2> */}
                    <h2>Popular Movies & Shows</h2>
                </div>
                <div className='listSection'>
                    <ContentList movieList={movieList} tv={tv}/>
                </div>
                <div className='paginationSection'>
                {startNum>1 && <button className='previousSet' onClick={previousNumGenerator}>Previous Set</button>}
                    <div className='numberButtonSection'>{newArr.map((ele: number, index: number) => {
                        return (
                            <button className={page === ele ? 'active' : ''} key={index} onClick={(ele) => pageClick(ele)}>{ele}
                            </button>
                        )
                    })

                    }</div>
                    <button className='nextSet' onClick={initialNumGenerator}>Next Set</button>
                </div>

            </div>


        </div>
    )

};
export default ShowPage;