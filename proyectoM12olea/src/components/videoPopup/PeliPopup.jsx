import React, { useRef, useState, useEffect } from "react";
import "./style2.scss";

const PeliPopup = ({ show, setShow, videoId, setVideoId }) => {
    const [videoURL, setVideoURL] = useState(null);
    const getVideo = async() => {
        try{
            const data = await fetch("http://equip07.insjoaquimmir.cat/api/videos/"+videoId, {
                headers: {
                    'Accept': "application/json"
                },
                method: "GET"
            })
            const resposta = await data.json();
            if (resposta.success == true) {
                setVideoURL(resposta.data.url);
            }else{
                console.log(resposta.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getVideo();
    }, [videoId]);
    const videoRef = useRef(null);
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
        videoRef.current.pause(); // Detener la reproducción del video

    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
          <div className="opacityLayer" onClick={hidePopup}></div>
          <div className="videoPlayer">
            <span className="closeBtn" onClick={hidePopup}>
              <i className="bi bi-x-lg"></i>
            </span>
            {videoURL != null && (
              <video ref={videoRef} controls autoPlay>
                <source src={`${videoURL}.mp4`} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      );
};

export default PeliPopup;