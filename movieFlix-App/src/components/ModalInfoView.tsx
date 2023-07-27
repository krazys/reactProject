import React, {useEffect, useState} from 'react';
import '../../styles/modalInfoView.scss';


interface fetchedDataResponse{
    title: string,
    overview: string,
    vote_average: number,
    release_date: string,
    media_type: string,
    adult: boolean,
    poster_path: string,
    first_air_date: string,
    name:string,
    id: number,
    genre_ids: Array<number>,
}
type TrendingBlockProps = {
    modalInfoData: fetchedDataResponse,
}

const ModalInfoView:React.FC<TrendingBlockProps> = ({modalInfoData} ) => {


    return(
        <div className='modalOuterWrapper'>
            <div className='innerContainer'>
            <span className="close">&times;</span>
                <div>
                    <h3>
                       {modalInfoData.title}
                    </h3>
                </div>
            </div>

        </div>
    )
}

export default ModalInfoView;