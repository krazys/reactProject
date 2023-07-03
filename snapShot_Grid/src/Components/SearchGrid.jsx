import React, { useEffect, useState } from 'react';
import '../Style/SearchGrid.scss';
import ImageGrid from './ImageGrid';
import { apiKey } from '../Api/Config';

const SearchGrid = () => {
  const [searchtxt, setSearchTxt] = useState('');
  const [textValue, setTextValue] = useState('car');
  const [responseData, setResponseData] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  };

  useEffect(() => {
    flickerCall();
  }, []);

  const flickerCall = async () => {
    try {
      let response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${textValue}&per_page=24&format=json&nojsoncallback=1`
      );

      if (response.ok) {
        let data = await response.json();
        console.log('data', data.photos.photo);
        setResponseData(data.photos.photo);
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const searchTerm = () => {
    setSearchTxt(textValue);
    // console.log(flickerCall());
    flickerCall()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log('f', err);
      });
  };

  let searchedTxt = '';
  if (searchtxt.length > 1) {
    let restStr = searchtxt.substring(1);
    console.log(restStr);
    searchedTxt = searchtxt[0].toUpperCase().concat(restStr);
  }

  return (
    <div className="OuterContainer">
      <h1 className="header">SnapShot Grid</h1>
      <div className="inputContainer">
        <div className="searchContainer">
          <input placeholder="search" type="text" onChange={handleChange} />
          <button disabled={textValue.length < 2} onClick={searchTerm}>
            {' '}
            Search
          </button>
        </div>
      </div>

      <div className="displayContainer">
        <h3>{searchedTxt} Images</h3>
        <ImageGrid fecthedValue={responseData} />
      </div>
    </div>
  );
};

export default SearchGrid;
