import React, { useState } from 'react';
import { img_300 } from '../config/config';
import '../../styles/movieBlock.scss';
import Carousel, { CarouselItem } from './Carousel';
import ModalInfoView from './ModalInfoView';

interface fetchedDataResponse {
    title: string,
    overview: string,
    vote_average: number,
    release_date: string,
    media_type: string,
    adult: boolean,
    poster_path: string,
    first_air_date: string,
    name: string,
    id: number,
    genre_ids: Array<number>,
}

type TrendingBlockProps = {
    fetchedData: Array<fetchedDataResponse>,
}
const TrendingBlock: React.FC<TrendingBlockProps> = ({ fetchedData }) => {

    const [modalopen, setModalOpen] = useState<boolean>(false);
    const [modalInfoData, setModalInfoData] = useState<fetchedDataResponse>()

    let groupedItems:any= [];
    let elementsPerSlide = 4;
    if (fetchedData.length > 4) {
        for (let i = 0; i < fetchedData.length; i += elementsPerSlide) {

            groupedItems.push(fetchedData.slice(i, i + elementsPerSlide))
        }
    }
    console.log(groupedItems);

    const capitalizeFirstLetter = (str: string) => {
        let x = str.charAt(0).toUpperCase() + str.slice(1);
        console.log(x)
        return x;
    };

    const openmoreInfoModal = (index:number, indexInner: number) => {
        setModalOpen(!modalopen);
        console.log("NUM",index, indexInner);
        setModalInfoData(groupedItems[index][indexInner]);
        

    }
    console.log("D", modalInfoData)

    return (
        <div className='movieBlockOuter'>
            <div>
                {(groupedItems.length > 2) && <Carousel>
                    {/* <CarouselItem width={100}> */}
                    {
                        groupedItems.map((group:any, index:number) => {
                            return (
                                <CarouselItem key={index} width={100}>
                                    {group.map((ele:any, indexInner:number )=> {
                                        return (
                                            <div className='individualBlockElem' key={indexInner} onClick={()=>openmoreInfoModal(index, indexInner)}>
                                                <div className='topSection'>
                                                    <img width={284} height={200} src={`${img_300}${ele.poster_path}`} alt={ele.title} />
                                                </div>
                                                <div className='rating'>{Math.round(ele.vote_average * 10) / 10} </div>
                                                <div className='bottomSection'>
                                                    <h3>
                                                        {(ele.media_type === 'tv') ? capitalizeFirstLetter(ele.name) : capitalizeFirstLetter(ele.title)}
                                                    </h3>
                                                    <div className='movieInfo'>
                                                        <p>{capitalizeFirstLetter(ele.media_type)} </p>
                                                        <p> {(ele.media_type === 'tv') ? ele.first_air_date : ele.release_date} </p>
                                                    </div>
                                                </div>

                                            </div>

                                        )
                                    })

                                    }
                                </CarouselItem>
                            )
                        })
                    }
                    {/* </CarouselItem> */}
                </Carousel>
                }

                {modalopen && modalInfoData !== undefined &&
                    <ModalInfoView modalInfoData={modalInfoData} />
                }
            </div>
        </div>
    )

}

export default TrendingBlock;