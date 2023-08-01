import React, {useEffect, useState} from 'react';
import '../../styles/modalInfoView.scss';
// import ReactPlayer from 'react-player';
import YouTube, { YouTubeProps } from 'react-youtube';


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
    popularity:number,
    vote_count:number,
}

interface modalDetailedInfoResponse {
    genres: Array<object>,
    imdb_id: string,
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
    videos: any,
    number_of_seasons:number,
    number_of_episodes:number,
    
}

type ModalInfoViewProps = {
    modalInfoData: fetchedDataResponse,
    closemoreInfoModal: ()=> void;
    modalDetailedInfo?: modalDetailedInfoResponse;
}

const ModalInfoView:React.FC<ModalInfoViewProps> = ({modalInfoData, closemoreInfoModal, modalDetailedInfo} ) => {

    let [ videoSource, setVideoSource ] = useState<string>('');
    const capitalizeFirstLetter = (str: string) => {
        let x = str.charAt(0).toUpperCase() + str.slice(1);
        console.log(x)
        return x;
    };

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    
      const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '830',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    const videoFetch = ()=>{
        if (modalDetailedInfo !=undefined ){
            let xv=   modalDetailedInfo.videos.result;
      modalDetailedInfo.videos.results.map((ele:any)=>{
            if (ele.type==='Trailer'){
                setVideoSource(ele.key)
                return ele.id;
            }
            
        })
    }
    }

    useEffect(()=>{
            videoFetch();
        
    }, [modalDetailedInfo]);

    // let videoUrl = `https://www.youtube.com/watch?v=${videoSource}`;
    // console.log(videoUrl)

    return(
        <div className='modalOuterWrapper'>
            <div className='innerContainer'>
            <span className="close" onClick={closemoreInfoModal}>&times;</span>
            <div className='videoSection'>
            <YouTube videoId={videoSource} opts={opts} onReady={onPlayerReady} />
            </div>
                <div className='movieInfoSection'>
                <div className='leftSection'>
                    <h3>
                       {(modalInfoData.media_type === 'tv') ? capitalizeFirstLetter(modalInfoData.name) : capitalizeFirstLetter(modalInfoData.title)}
                    </h3>
                    <p>{ modalInfoData.overview}</p>
                    <p>{ modalDetailedInfo?.tagline}</p>
                    </div>
                    <div className='rightSection'>
                <ul>
                    <li><span>Popularity:</span> &nbsp;{Math.round(modalInfoData.popularity * 10) / 10 }</li>
                    <li><span>Average Ratings:</span>&nbsp;{Math.round(modalInfoData.vote_average * 10) / 10  }</li>
                    <li><span>Genres:</span>&nbsp;{modalDetailedInfo?.genres?.map((ele:any)=>{
                        return <span className='genres'> {ele?.name },</span>
                    }) }</li>
                 { (modalInfoData.media_type === 'tv') ? <><li><span>number of seasons:</span>&nbsp;{modalDetailedInfo?.number_of_seasons }</li>
                  <li><span>number of episodes:</span>&nbsp;{modalDetailedInfo?.number_of_episodes }</li></>: 
                  <li><span>RunTime:</span>&nbsp;{modalDetailedInfo!==undefined && Math.ceil((modalDetailedInfo?.runtime)/60 * 10) / 10}Hrs</li>
                }
                </ul>
                </div>
                </div>

              
            </div>

        </div>
    )
}

export default ModalInfoView;