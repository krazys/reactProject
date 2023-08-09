import React, { useEffect, useState } from "react";
import { img_300 } from "../config/config";
import "../../styles/contentList.scss";
import ModalInfoView from "./ModalInfoView";
import axios from "axios";

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
interface watchProvidersResponse {
  link: string;
  rent: Array<object>;
  provider_name: string;
  logo_path: string;
  buy: Array<object>;
  flatrate?: Array<object>;
  ads: Array<object>;
}

interface modalDetailedInfoResponse {
  genres: Array<object>;
  imdb_id: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  videos: any;
  number_of_seasons: number;
  number_of_episodes: number;
}
type ContentListProps = {
  movieList: Array<movieRepsonse>;
  movie?: string;
  tv?: string;
  trending?: string;
};
const ContentList: React.FC<ContentListProps> = ({
  movieList,
  movie,
  tv,
  trending,
}) => {
  // const capitalizeFirstLetter = (str: string) => {
  //     let x = str.charAt(0).toUpperCase() + str.slice(1);
  //     console.log(x)
  //     return x;
  // };

  const [modalopen, setModalOpen] = useState<boolean>(false);
  const [modalInfoData, setModalInfoData] = useState<movieRepsonse>();
  const [modalDetailedInfo, setModalDetailedInfo] =
    useState<modalDetailedInfoResponse>();
  const [watchProvidersData, setWatchProvidersData] =
    useState<watchProvidersResponse>();

  const movieDetails = async (modalInfoData: any) => {
    try {
      console.log(modalInfoData.id, modalInfoData.media_type);
      let media_type =
        modalInfoData.media_type !== undefined
          ? modalInfoData.media_type
          : movie !== undefined
          ? movie
          : tv;
      let response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${modalInfoData.id}?api_key=3e85d84a2d3e58168179cf80ecdecea5&append_to_response=videos`
      );
      console.log("deatiled", response);
      setModalDetailedInfo(response?.data);
      let watchProviderList = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${modalInfoData.id}/watch/providers?api_key=3e85d84a2d3e58168179cf80ecdecea5`
      );
      setWatchProvidersData(watchProviderList?.data?.results["US"]);
      console.log(watchProviderList, modalInfoData.id, "watchProviderList");
    } catch (error) {
      console.log("deatiled", modalInfoData);
      console.log(error);
    }
  };

  const openmoreInfoModal = (index: number) => {
    setModalOpen(!modalopen);
    // console.log("NUM",index, indexInner);
    setModalInfoData(movieList[index]);
  };
  const closemoreInfoModal = () => {
    setModalOpen(!modalopen);
    console.log("Callback function executed!");
  };

  useEffect(() => {
    movieDetails(modalInfoData);
  }, [modalInfoData]);

  return (
    <div className="contentListWrapper">
      {movieList.map((ele, index) => {
        let trimmedTitle =
          (ele?.title && ele?.title.slice(0, 30)) +
          (ele?.title && ele.title.length > 30 ? "..." : "");
        let trimmedName =
          (ele?.name && ele?.name.slice(0, 30)) +
          (ele?.name && ele?.name.length > 30 ? "..." : "");
        return (
          <div
            className="individualBlockElem"
            key={index}
            onClick={() => openmoreInfoModal(index)}
          >
            <div className="topSection">
              <img
                width={284}
                height={200}
                src={`${img_300}${
                  ele.poster_path !== null ? ele.poster_path : ele.backdrop_path
                }`}
                alt={trimmedTitle || trimmedName}
              />
            </div>
            <div className="rating">
              {Math.round(ele.vote_average * 10) / 10}{" "}
            </div>
            <div className="bottomSection">
              <h3>
                {tv === "tv" || ele.media_type === "tv"
                  ? trimmedName
                  : trimmedTitle}
              </h3>
              <div className="movieInfo">
                {/* <p>{capitalizeFirstLetter(ele.media_type)} </p> */}
                <p>
                  {" "}
                  {tv === "tv" || ele.media_type === "tv"
                    ? ele.first_air_date
                    : ele.release_date}{" "}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      {modalopen && modalInfoData !== undefined && (
        <ModalInfoView
          modalInfoData={modalInfoData}
          closemoreInfoModal={closemoreInfoModal}
          modalDetailedInfo={modalDetailedInfo}
          movie={movie}
          tv={tv}
          watchProvidersData={watchProvidersData}
        />
      )}
    </div>
  );
};
export default ContentList;
