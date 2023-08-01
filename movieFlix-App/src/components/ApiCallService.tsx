import axios from 'axios';

export const movieDetails = async (modalInfoData:any)=>{

    try{
        console.log(modalInfoData.id, modalInfoData.media_type)
let response = await axios.get(`https://api.themoviedb.org/3/${modalInfoData.media_type}/${modalInfoData.id}?api_key=3e85d84a2d3e58168179cf80ecdecea5&append_to_response=videos`)
return response?.data?.results;
    } catch (error){
console.log(error)
    }
}