import React,{useState, useEffect} from 'react';
import ImageGrid from './ImageGrid';
import flickerCall from '../Api/FlickerCall';
import { apiKey } from '../Api/Config';


const PreDefinedGrid = ({textValue} )=> {
    const [fetchedResult, setFetchedResult ] = useState([]);


//     let fetchedResult = flickerCall(apiKey, textValue);
// console.log("fetchedResult", fetchedResult )
useEffect(( )=>{
    flickerCall(apiKey, textValue)
    .then((data)=>{
        console.log("data2", data)
        setFetchedResult(data)
    })
    .catch((err)=>{
        console.log(err);
    })
}, [textValue])
   


    console.log("fetchedResult", textValue, fetchedResult);

    let capitalizedTxt = textValue[0].toUpperCase().concat(textValue.slice(1))

    return (
<div className='preDefinedSection'>
    <h3>{capitalizedTxt} Images</h3>
    <ImageGrid fecthedValue={fetchedResult}/>
</div>

    )

}

export default PreDefinedGrid;