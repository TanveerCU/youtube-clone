import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideosBySearch } from "../../redux/actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SideCard from "../utils/SideCard";

function Search() {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  return (
    <div className=" ml-14 mt-12 sm:ml-48 sm:mt-16  sm:pt-8 pt-5">
      {!loading ? (
        videos?.map((video) => (
          <>
            <SideCard video={video} key={video.id.videoId} searchScreen />
            <br />
            <hr className='my-3'/>
          </>
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </div>
  );
}

export default Search;
