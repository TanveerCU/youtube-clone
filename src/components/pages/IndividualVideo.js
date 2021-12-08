import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SideCard from "../utils/SideCard";
import MetaData from "../utils/MetaData";
import Comments from "../utils/Comments";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videos.action";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function IndividualVideo() {
  let dispatch = useDispatch();
  let { id } = useParams();
  console.log(id);
  const [videosize, setvideosize] = useState({
    height: 0,
    width: 0,
    paddingLeft: 0,
    paddingRight: 0,
    restWidth: 0,
    size: 1,
  });

  const style = {
    display: `${videosize.size ? "flex" : "block"}`,
    flexDirection: `${videosize.size ? "column" : ""}`,
    position: `${videosize.size ? "initial" : "relative"}`,
  };

  const sidebarStyle = {
    width: `${
      videosize.size
        ? `${videosize.restWidth}px`
        : `${videosize.restWidth - 18}px`
    }`,
    height: `${videosize.size ? "300px" : "auto"}`,
    paddingLeft: `${videosize.size ? "3px" : "15px"}`,
    paddingRight: `${videosize.size ? "3px" : "5px"}`,
    position: `${videosize.size ? "initial" : "absolute"}`,
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  console.log(`diff: ${windowDimensions.width / windowDimensions.height}`);
  useEffect(() => {
    if (windowDimensions.width / windowDimensions.height >= 1.7) {
      setvideosize({
        width: windowDimensions.width * 0.6,
        height: windowDimensions.width * 0.5 * 0.56,
        paddingLeft: 7,
        restWidth: windowDimensions.width - windowDimensions.width * 0.6,
        size: 0,
      });
    } else if (
      windowDimensions.width / windowDimensions.height > 1 &&
      windowDimensions.width / windowDimensions.height < 1.7
    ) {
      setvideosize({
        width: windowDimensions.width * 0.68,
        height: windowDimensions.width * 0.68 * 0.56,
        paddingLeft: 3,
        restWidth: windowDimensions.width - windowDimensions.width * 0.68,
        size: 0,
      });
    } else if (windowDimensions.width / windowDimensions.height <= 1) {
      if (windowDimensions.width > 640) {
        setvideosize({
          width: windowDimensions.width,
          height: windowDimensions.width * 0.56,
          paddingLeft: 1,
          paddingRight: 1,
          size: 1,
          // restWidth: windowDimensions.width - windowDimensions.width * 0.68,
          restWidth: windowDimensions.width,
        });
      } else {
        setvideosize({
          width: windowDimensions.width,
          height: windowDimensions.width,
          paddingLeft: 0.3,
          paddingRight: 0.2,
          size: 1,
          restWidth: windowDimensions.width,
        });
      }
    }
  }, [windowDimensions.width, windowDimensions.height]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  const { video, loading } = useSelector((state) => state.selectedVideo);

  return (
    <div style={style}>
      <div className="mt-12 sm:mt-16 sm:pt-3 pt-5 flex flex-col sm:flex-row">
        {/* {`individual video ID: ${id}`} */}
        <div
          style={{
            width: `${videosize.width}px`,
            height: `${videosize.height}px`,
            paddingLeft: `${videosize.paddingLeft}rem`,
            paddingRight: `${videosize.paddingRight}rem`,
          }}
        >
          <iframe
            className="w-full h-full   "
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            allowFullScreen
            frameBorder="0"
            title={video?.snippet?.title}
          ></iframe>
        </div>
      </div>

      {/* MetaData */}
      {!loading ? (
        <div
          className="pr-2"
          style={{
            width: `${videosize.width}px`,

            paddingLeft: `${videosize.paddingLeft}rem`,
          }}
        >
          <MetaData video={video} videoId={id} />
        </div>
      ) : (
        <h6>Loading...</h6>
      )}

      {/* Side cards */}

      <div
        className="top-0 right-0 h-auto mt-3 sm:pl-5 sm:pr-5 space-y-2 overflow-scroll "
        style={sidebarStyle}
      >
        {!loading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => <SideCard video={video} key={video.id.videoId} />)
        ) : (
          <div>Loading..</div>
        )}
      </div>

      {/* Comments */}
      <div
        className="space-y-8"
        style={{
          width: `${videosize.width}px`,
          height: `${videosize.height}px`,
          paddingLeft: `${videosize.paddingLeft}rem`,
        }}
      >
        {/* <hr /> */}
        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </div>
    </div>
  );
}

export default IndividualVideo;
