import React, { useState, lazy, startTransition } from 'react';
import '../../styles/searchWrapper.scss';
import { GrSearch } from 'react-icons/gr';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';

const SearchResultsWrapper = lazy( () => import ('./SearchResultsWrapper'));


const SearchWrapper = () => {

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (ele: any) => {

        setInputValue(ele.target.value);
    }

    const handleSearch = ( )=> {
       
        navigate(`/search/${inputValue}`);

        // searchCall(inputValue);
        
    }

    console.log(inputValue, 'inputValue')

    return (
        <div className='searchWrapper'>
            <div className='innerWrapper'>

                <div className='inputSection'>
                    <Routes>
                        <Route path='/search' element={<SearchResultsWrapper /> }/>
                        </Routes>
                    <input type='text' name="search" value={inputValue} placeholder='Search for Movies, Shows..' onChange={(ele) => handleInputChange(ele)} /> 
                    <button className="bubblyButton" onClick={handleSearch}><GrSearch /></button>
                
                    
                </div>
                <div className='resultSection'>

                </div>
            </div>
        </div>
    )
}

export default SearchWrapper;