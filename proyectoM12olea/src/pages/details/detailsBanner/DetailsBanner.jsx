import React, { useState,useEffect, useContext } from "react";
import { UserContext } from "../../../userContext";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";


import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import PeliPopup from "../../../components/videoPopup/PeliPopup";
import { favorite, unfavorite, comprobarFavorito } from "../../../store/favorites/thunks";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [show2, setShow2] = useState(false);
    const [videoId2, setVideoId2] = useState(null);
    const { favorito } = useSelector((state) => state.favorite);
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const dispatch = useDispatch();
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    const { url } = useSelector((state) => state.home);
    
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
      };
    
      const closeModal = () => {
        setIsOpen(false);
      };
    
    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    useEffect(()=>{
        dispatch(comprobarFavorito(id, authToken));
      }, []);
    
    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <div className="container">
                                                
                                            <Img
                                                className="posterImg"
                                                src={
                                                    url.backdrop +
                                                    data.poster_path
                                                }
                                            />
                                        {authToken ? (
                                            <div
                                                className="playbtn"
                                                onClick={() => {
                                                    setShow2(true);
                                                    setVideoId2(id);
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="reproducir">
                                                    <i class="bi bi-play"></i>
                                                </span>
                                            </div>
                                         ) : (
                                            <></>
                                        )}
                                                                                         
                                            {authToken ? (
                                                !favorito ? (
                                                    <button onClick={(e) => {dispatch(favorite(id, authToken));}}>
                                                    <i className="bi bi-star"></i>
                                                    </button>
                                                ) : (
                                                    <button onClick={(e) => {dispatch(unfavorite(id, authToken));}}>
                                                    <i className="bi bi-star-fill"></i>
                                                    </button>
                                                )
                                            ) : (
                                                <></>
                                            )}
                                            

                                            </div>
                                        ) : (
                                            
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                                
                                            />
                                            
                                            
                                        )}
                                        
                                    </div>
                                    
                                    <div className="right">
                                        <div className="title">
                                            {`${
                                                data.name || data.title
                                            } (${dayjs(
                                                data?.release_date
                                            ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className="row">
                                            <CircleRating
                                                rating={data.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                            <div
                                                className="playbtn"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video.key);
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text">
                                                    Ver Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Descripción
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Estado:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Fecha de Lanzamiento:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            data.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Duracion:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(
                                                            data.runtime
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Escritor:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creador:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data
                                                                    ?.created_by
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                                <PeliPopup
                                    show={show2}
                                    setShow={setShow2}
                                    videoId={videoId2}
                                    setVideoId={setVideoId2}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;