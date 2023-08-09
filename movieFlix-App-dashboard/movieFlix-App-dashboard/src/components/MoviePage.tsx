import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import "../../styles/moviePage.scss";
import ContentList from "./ContentList";
// import ReactPaginate from 'react-paginate';

interface movieRepsonse {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  adult: boolean;
  name?: string;
  media_type: string;
  first_air_date?: string;

  overview: string;
  genre_ids: Array<number>;
  popularity: number;
  vote_count: number;
  backdrop_path?: string;
}

interface genreResponse {
  id: number;
  name: string;
  toggle?: boolean;
}
interface genreResponseModify {
  id: number;
  name: string;
  toggle: boolean;
}

type MovieProps = {
  movie: string;
};

const MoviePage: React.FC<MovieProps> = ({ movie }) => {
  let [movieList, setMovieList] = useState<Array<movieRepsonse>>([]);
  // let [filterNameSelected, setFilterNameSelected] = useState<string>('now_playing');
  let [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  let [page, setPage] = useState<number>(1);
  let [startNum, setStartNum] = useState<number>(1);
  let [lastNum, setlastNum] = useState<number>(10);
  let [newNumberArr, setNewNumberArr] = useState<Array<number>>([]);
  let [genreUrlId, setGenreUrlId] = useState<string>("");
  let [genreList, setGenreList] = useState<Array<genreResponse>>([]);
  // let [genreListModify, setGenreListModify] = useState<Array<genreResponseModify>>([]);
  // const [selectedGenreIds, setSelectedGenreIds] = useState<Array<number>>([]);

  const generateNum = (a: number, b: number) => {
    const numberArr: number[] = [];
    for (let i = a; i < b; i++) {
      numberArr.push(i);
      console.log(a, b, i, "genearted2");
    }

    setNewNumberArr(numberArr);
  };
  // console.log(numberArr)
  const pageClick = (ele: any) => {
    let num = Number(ele.target.textContent);
    setPage(num);
  };
  console.log(page, "page");

  const initialNumGenerator = () => {
    setlastNum(lastNum + 10);
    setStartNum(lastNum);
    setPage(lastNum);
  };
  const previousNumGenerator = () => {
    setlastNum(lastNum - 10);
    if (startNum != 10) {
      setStartNum(startNum - 10);
    } else {
      setStartNum(startNum - 9);
    }

    setPage(lastNum - 11);
  };

  console.log(startNum, "startNum");
  console.log(lastNum, "lastNum");

  const movieListFetch = async () => {
    try {
      let response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=3e85d84a2d3e58168179cf80ecdecea5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreUrlId}`
      );
      console.log(response);

      setMovieList(response?.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    movieListFetch();

    generateNum(startNum, lastNum);
    setIsDropdownOpen(false);
  }, [page, startNum, lastNum, genreUrlId]);

  useEffect(() => {
    generFetch();
  }, []);

  const generFetch = async () => {
    try {
      let response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=3e85d84a2d3e58168179cf80ecdecea5`
      );
      console.log("response", response?.data?.genres);

      let responseArr = response?.data?.genres;
      let newArr = responseArr.map((ele: any, index: number) => {
        return { ...ele, toggle: false };
      });
      setGenreList(newArr);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenreChange = (indexPassed: number) => {
    // const updatedCheckdState =  isChecked.map((ele, index)=>{
    //    return indexPassed ===index ? !ele : ele;
    // })
    // console.log(updatedCheckdState, 'updatedCheckdState')
    // setIsChecked(updatedCheckdState);

    const updatedgenreListModify = genreList.map((ele, index) => {
      // return  indexPassed ===index ? !ele : ele;

      if (indexPassed === index) {
        return {
          ...ele,
          toggle: !ele.toggle,
        };
      } else {
        return ele;
      }
    });
    console.log(updatedgenreListModify, "updatedgenreListModify");
    setGenreList(updatedgenreListModify);

    // setTimeout(()=>{
    //   let x= selectedGenreId();
    //   console.log(x, "x");

    // }, 10000);
  };

  const filteredGenreId = () => {
    let fValue = genreList.filter((ele) => {
      if (ele.toggle === true) {
        return ele;
      }
    });
    return fValue.map((ele) => ele.id);
  };
  let stringGenreIdArr;
  const stringGenreId = (stringGenreIdArr: any) => {
    if (stringGenreIdArr.length < 1) setGenreUrlId("");
    else setGenreUrlId(stringGenreIdArr.join(","));
  };
  console.log();

  // let indexSelectedArray=[];
  useEffect(() => {
    stringGenreIdArr = filteredGenreId();
    console.log(stringGenreIdArr, "stringGenreIdArr");

    stringGenreId(stringGenreIdArr);

    // setSelectedGenreIds(x)
  }, [genreList]);

  const handleDropdown = () => {
    // for (let i=0; i<genreList.length; i++){
    //     isChecked.push(false)
    // }

    // setIsChecked(new Array(genreList.length).fill(false));
    setIsDropdownOpen(!isDropdownOpen);

    //   let newArr=  genreList.map((ele, index)=>{
    //      return {...ele, toggle:false};
    //   });
    //   setGenreListModify(newArr);
  };

  return (
    <div>
      <Header />
      <div className="MovieWrapper">
        <div className="filterSection">
          {/* <h2>{filterNameSelected} Movie</h2> */}
          <h2>Popular Movie</h2>
          <div className="genreFilter">
            <div className="actualFilter">
              <button onClick={handleDropdown}>Genre</button>
              {isDropdownOpen && (
                <div className="dropdownContainer">
                  <ul>
                    {genreList.map((ele, index) => {
                      return (
                        <li key={index}>
                          <input
                            type="checkbox"
                            onChange={() => handleGenreChange(index)}
                            checked={ele.toggle}
                          />{" "}
                          {ele.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {movieList.length > 1 ? (
          <div className="listSection">
            <ContentList movieList={movieList} movie={movie} />
          </div>
        ) : (
          <h3>No Data Found.</h3>
        )}
        <div className="paginationSection">
          {startNum > 1 && (
            <button className="previousSet" onClick={previousNumGenerator}>
              Previous Set
            </button>
          )}
          <div className="numberButtonSection">
            {newNumberArr.map((ele: number, index: number) => {
              return (
                <button
                  className={page === ele ? "active" : ""}
                  key={index}
                  onClick={(ele) => pageClick(ele)}
                >
                  {ele}
                </button>
              );
            })}
          </div>
          <button className="nextSet" onClick={initialNumGenerator}>
            Next Set
          </button>
        </div>
      </div>
    </div>
  );
};
export default MoviePage;
