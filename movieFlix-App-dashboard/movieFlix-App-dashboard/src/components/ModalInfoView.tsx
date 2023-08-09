import React, { useEffect, useState } from "react";
import "../../styles/modalInfoView.scss";
// import ReactPlayer from 'react-player';
// import YouTube, { YouTubeProps } from 'react-youtube';
import YoutubeEmbed from "./YoutubeEmbed";
import { img_300 } from "../config/config";

interface fetchedDataResponse {
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  media_type: string;
  adult: boolean;
  poster_path: string;
  first_air_date?: string;
  name?: string;
  id: number;
  genre_ids?: Array<number>;
  popularity: number;
  vote_count: number;
  profile_path?: string;
}

interface modalDetailedInfoResponse {
  genres: Array<object>;
  imdb_id: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  videos?: any;
  number_of_seasons: number;
  number_of_episodes: number;
}

interface watchProvidersResponse {
  link: string;
  rent: Array<object>;
  provider_name: string;
  logo_path: string;
  buy: Array<object>;
  flatrate?: Array<object>;
  ads: Array<object>;
}

type ModalInfoViewProps = {
  modalInfoData: fetchedDataResponse;
  closemoreInfoModal: () => void;
  modalDetailedInfo?: modalDetailedInfoResponse;
  movie?: string;
  tv?: string;
  watchProvidersData?: watchProvidersResponse;
};

const ModalInfoView: React.FC<ModalInfoViewProps> = ({
  modalInfoData,
  closemoreInfoModal,
  modalDetailedInfo,
  movie,
  tv,
  watchProvidersData,
}) => {
  let [videoSource, setVideoSource] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(830);
  const [windowHeight, setWindowHeight] = useState<number>(830);
  const capitalizeFirstLetter = (str: string) => {
    let x = str.charAt(0).toUpperCase() + str.slice(1);
    console.log(x);
    return x;
  };

  // const onPlayerReady: YouTubeProps['onReady'] = (event) => {
  //     // access to player in all event handlers via event.target
  //     event.target.playVideo();
  // }

  // const opts: YouTubeProps['opts'] = {
  //     height: '360', // Default height for desktop view
  //     width: '830',
  //     playerVars: {
  //         // https://developers.google.com/youtube/player_parameters
  //         autoplay: 1,
  //     },
  // };

  window.addEventListener("resize", function () {
    if (this.window.innerWidth < 720) {
      setWindowWidth(240);
      setWindowHeight(180);
    } else {
      setWindowWidth(830);
      setWindowHeight(390);
    }
  });

  const videoFetch = () => {
    if (modalDetailedInfo != undefined && modalDetailedInfo.videos) {
      let xv = modalDetailedInfo.videos.result;
      // modalDetailedInfo.videos.results.map((ele: any) => {
      //     if (ele.type === 'Trailer') {
      //         setVideoSource(ele.key)
      //         return ele.id;
      //     } else{
      //         setVideoSource(ele.key)
      //     }

      // })
      const trailerVideo = modalDetailedInfo.videos.results.find(
        (ele: any) => ele.type === "Trailer"
      );
      if (trailerVideo) {
        setVideoSource(trailerVideo.key);
      } else if (modalDetailedInfo.videos.results.length > 0) {
        setVideoSource(modalDetailedInfo.videos.results[0].key);
      } else {
        setVideoSource("");
      }
    }
  };

  useEffect(() => {
    videoFetch();
  }, [modalDetailedInfo]);

  let videoUrl = `https://www.youtube.com/watch?v=${videoSource}`;
  console.log(videoUrl, "videoUrl");
  console.log(videoSource, "videoSource");

  //     const isMovie = movie !== undefined;
  // const isTV = tv !== undefined;
  // const isTVMediaType = modalInfoData.media_type === 'tv';

  // let runTimeContent = null;

  // if (isMovie) {
  //   const runtimeHours = modalDetailedInfo !== undefined
  //     ? Math.ceil((modalDetailedInfo.runtime) / 60 * 10) / 10
  //     : null;
  //     runTimeContent = <li><span>RunTime:</span>&nbsp;{runtimeHours}Hrs</li>;
  // } else if (isTV || isTVMediaType) {
  //     runTimeContent = (
  //     <>
  //       <li><span>Number of seasons:</span>&nbsp;{modalDetailedInfo?.number_of_seasons}</li>
  //       <li><span>Number of episodes:</span>&nbsp;{modalDetailedInfo?.number_of_episodes}</li>
  //     </>
  //   );
  // }

  // // Render the content
  // {runTimeContent}

  return (
    <div className="modalOuterWrapper" onClick={closemoreInfoModal}>
      <div className="innerContainer" onClick={(e) => e.stopPropagation()}>
        {/* <span className="close" >&times;</span> */}
        <div className="videoSection">
          {videoSource !== "" ? (
            <YoutubeEmbed embedId={videoSource} />
          ) : (
            <p>No Video Found</p>
          )}
        </div>
        {modalInfoData.media_type !== "person" ? (
          <div className="movieInfoSection">
            <div className="leftSection">
              <h3>
                {/* {(modalInfoData.media_type === 'tv') ? capitalizeFirstLetter(modalInfoData.name) : capitalizeFirstLetter(modalInfoData.title)} */}
                {/* {(modalInfoData.media_type === 'tv') ? modalInfoData.name : modalInfoData.title}
                       {modalInfoData.media_type !== undefined ? modalInfoData.media_type: movie !==undefined ? modalInfoData.name: modalInfoData.title} */}
                {movie !== undefined
                  ? modalInfoData.title
                  : tv !== undefined
                  ? modalInfoData.name
                  : modalInfoData.media_type === "tv"
                  ? modalInfoData.name
                  : modalInfoData.title}
              </h3>
              <p>
                {modalInfoData.overview !== ""
                  ? modalInfoData.overview
                  : "No Data Available"}
              </p>
              <p>{modalDetailedInfo?.tagline}</p>
              <div className="stream">
                <h3>Streaming On :</h3>
                {watchProvidersData !== undefined ? (
                  <>
                    {watchProvidersData && watchProvidersData?.buy && (
                      <div className="buy">
                        <h4> Buy on:</h4>
                        <div className="serviceProviderOuter">
                          {watchProvidersData.buy.map((ele: any) => {
                            return (
                              <div className="serviceProvider">
                                <p>{ele.provider_name}</p>
                                <img
                                  width={32}
                                  height={32}
                                  src={`https://www.themoviedb.org/t/p/original${ele.logo_path}`}
                                  alt={ele.provider_name}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {watchProvidersData && watchProvidersData?.flatrate && (
                      <div className="flatrate">
                        <h4> Flatrate on:</h4>
                        <div className="serviceProviderOuter">
                          {watchProvidersData.flatrate.map((ele: any) => {
                            return (
                              <div className="serviceProvider">
                                <p>{ele.provider_name}</p>
                                <img
                                  width={32}
                                  height={32}
                                  src={`https://www.themoviedb.org/t/p/original${ele.logo_path}`}
                                  alt={ele.provider_name}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {watchProvidersData && watchProvidersData?.rent && (
                      <div className="rent">
                        <h4> Rent on:</h4>
                        <div className="serviceProviderOuter">
                          {watchProvidersData.rent.map((ele: any) => {
                            return (
                              <div className="serviceProvider">
                                <p>{ele.provider_name}</p>
                                <img
                                  width={32}
                                  height={32}
                                  src={`https://www.themoviedb.org/t/p/original${ele.logo_path}`}
                                  alt={ele.provider_name}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {watchProvidersData && watchProvidersData?.ads && (
                      <div className="rent">
                        <h4> With Ads on:</h4>
                        <div className="serviceProviderOuter">
                          {watchProvidersData.ads.map((ele: any) => {
                            return (
                              <div className="serviceProvider">
                                <p>{ele.provider_name}</p>
                                <img
                                  width={32}
                                  height={32}
                                  src={`https://www.themoviedb.org/t/p/original${ele.logo_path}`}
                                  alt={ele.provider_name}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p> No Data Avilable</p>
                )}
              </div>
            </div>
            <div className="rightSection">
              <ul>
                <li>
                  <span>Popularity:</span> &nbsp;
                  {Math.round(modalInfoData.popularity * 10) / 10}
                </li>
                <li>
                  <span>Average Ratings:</span>&nbsp;
                  {Math.round(modalInfoData.vote_average * 10) / 10}
                </li>
                <li>
                  <span>Genres:</span>&nbsp;
                  {modalDetailedInfo?.genres?.map((ele: any) => {
                    return <span className="genres"> {ele?.name},</span>;
                  })}
                </li>
                {/* {(modalInfoData.media_type === 'tv') ? <><li><span>number of seasons:</span>&nbsp;{modalDetailedInfo?.number_of_seasons}</li>
                                <li><span>number of episodes:</span>&nbsp;{modalDetailedInfo?.number_of_episodes}</li></> :
                                <li><span>RunTime:</span>&nbsp;{modalDetailedInfo !== undefined && Math.ceil((modalDetailedInfo?.runtime) / 60 * 10) / 10}Hrs</li>
                            } */}

                {movie !== undefined ? (
                  <>
                    <li>
                      <span>RunTime:</span>&nbsp;
                      {modalDetailedInfo !== undefined &&
                        Math.ceil((modalDetailedInfo?.runtime / 60) * 10) / 10}
                      Hrs
                    </li>
                    <li>
                      <span>Released:</span>&nbsp;{modalInfoData?.release_date}
                    </li>
                  </>
                ) : tv !== undefined ? (
                  <>
                    <li>
                      <span>Number of seasons:</span>&nbsp;
                      {modalDetailedInfo?.number_of_seasons}
                    </li>
                    <li>
                      <span>Number of episodes:</span>&nbsp;
                      {modalDetailedInfo?.number_of_episodes}
                    </li>
                    <li>
                      <span>First Aired On:</span>&nbsp;
                      {modalInfoData?.first_air_date}
                    </li>
                  </>
                ) : modalInfoData.media_type === "tv" ? (
                  <>
                    <li>
                      <span>Number of seasons:</span>&nbsp;
                      {modalDetailedInfo?.number_of_seasons}
                    </li>
                    <li>
                      <span>Number of episodes:</span>&nbsp;
                      {modalDetailedInfo?.number_of_episodes}
                    </li>
                    <li>
                      <span>First Aired On:</span>&nbsp;
                      {modalInfoData?.first_air_date}
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <span>RunTime:</span>&nbsp;
                      {modalDetailedInfo !== undefined &&
                        Math.ceil((modalDetailedInfo?.runtime / 60) * 10) / 10}
                      Hrs
                    </li>
                    <li>
                      <span>Released:</span>&nbsp;{modalInfoData?.release_date}
                    </li>
                  </>
                )}
                {/* {runTimeContent} */}
              </ul>
            </div>
          </div>
        ) : (
          <div className="movieInfoSection">
            <div className="personDetails">
              <div>
                <img
                  width={284}
                  height={200}
                  src={`${img_300}${
                    modalInfoData.profile_path !== null
                      ? modalInfoData.profile_path
                      : "No Image Found"
                  }`}
                  alt="No Image Found"
                />
              </div>
              <h3>
                {" "}
                <span>Name:</span> &nbsp; {modalInfoData.name}
              </h3>
              <p>
                <span>Popularity:</span>&nbsp;{modalInfoData.popularity}
              </p>
              <p>
                <span>Media Type:</span>&nbsp;{modalInfoData.media_type}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalInfoView;
