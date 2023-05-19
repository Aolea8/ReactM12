import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";
import { UserContext } from "../../userContext";
import { useContext } from "react";


import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};


const Favoritos = () => {
    let { authToken, setAuthToken } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [mediaType, setMediaType] = useState("movie");

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
    const [idsToFilter, setIdsToFilter] = useState([]);
    const getIds = async () => {
        try {
            const data = await fetch("http://127.0.0.1:8000/api/user/favorites", {
                headers: {
                    'Accept': 'application/json',
                    Authorization: "Bearer " + authToken
                },
                method: "GET"
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                const ids = resposta.data.map(item => item.id_peliserie);
                console.log(ids)
                setIdsToFilter(ids);
                fetchInitialData();
            } else {
                console.log(resposta.message);
            }
        } catch (e) {
            console.log(e);
        }
    };
    

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
          const filteredData = res.results.filter((item) => idsToFilter.includes(item.id));
          console.log(filteredData)
          setData(filteredData);
          setLoading(false);
        });
      };
      useEffect(() => {
        if (idsToFilter) {
            fetchInitialData();
        }
    }, [idsToFilter]);
      
      
    
    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
                console.log(data);
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setGenre(null);
        getIds();
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
    

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };
    
    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        
                        {mediaType === "tv"
                            ? "Explora Series"
                            : "Explora Peliculas"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Selecciona el Genero"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Favoritos;