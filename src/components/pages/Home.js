import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../utils/Card";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import InfiniteScroll from "react-infinite-scroll-component";

import LinearProgress from '@mui/material/LinearProgress';

function Home() {
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    }
  }, [dispatch]);

  const fetchData = () => {
    if (activeCategory === "All") dispatch(getPopularVideos());
    else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  // console.log("render");
  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={fetchData}
      hasMore={true}
      loader={<div> <LinearProgress sx={{ width: '100%' ,marginTop:'10px'}}/></div>}
    >
    <div className=" ml-14   flex flex-wrap items-center justify-center  sm:ml-48  sm:items-start ">
      {!loading ? (
        <>
          {videos.map((video) => {
            return <Card key={video.id} detail={video} type={"home"} />;
          })}
        </>
      ) : (
        <>
          {[...Array(20)].map(() => {
            return (
              <Stack
                spacing={1}
                className="mt-10 w-11/12 h-80 sm:w-80 sm:h-80 xl:w-72 xl:h-72 lg:h-56 lg:w-56 md:w-72 md:h-72 flex flex-col p-2 "
              >
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={118}
                  animation="wave"
                  sx={{ bgcolor: "grey.400" }}
                />
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  animation="wave"
                  sx={{ bgcolor: "grey.400" }}
                />
                <Skeleton
                  variant="text"
                  width={210}
                  animation="wave"
                  sx={{ bgcolor: "grey.400" }}
                />
                <Skeleton
                  variant="text"
                  width={210}
                  animation="wave"
                  sx={{ bgcolor: "grey.400" }}
                />
              </Stack>
            );
          })}
        </>
      )}
    </div>
     </InfiniteScroll>
  );
}

export default Home;
