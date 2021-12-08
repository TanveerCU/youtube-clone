import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../utils/Card";
import { getChannelDetails } from "../../redux/actions/channel.action";
import { getVideosByChannel } from "../../redux/actions/videos.action";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import numeral from "numeral";

function Channel() {
  const { channelId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  const { videos, loading } = useSelector((state) => state.channelVideos);
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );
  return (
    <>
      <div className=" ml-14 mt-12 sm:ml-48 sm:mt-16  sm:pt-8 pt-5">
        <div className="flex items-center justify-between sm:px-8 px-1">
          <div className="flex items-center space-x-4">
            <img
              src={snippet?.thumbnails?.default?.url}
              alt="logo"
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">{snippet?.title}</p>
              <p className="text-xs">
                {numeral(statistics?.subscriberCount).format("0.a")} subscribers
              </p>
            </div>
          </div>
          <div>
            <span
              className="px-6 py-3 text-white font-bold rounded-sm cursor-pointer"
              style={{ backgroundColor: "#FF0000" }}
            >
              SUBSCRIBE
            </span>
          </div>
        </div>
        <hr className="mt-5" />
        <hr className="pb-5" />
      </div>
      <div className=" ml-14   flex flex-wrap items-center justify-center  sm:ml-48  sm:items-start ">
        {!loading ? (
          <>
            {videos.map((video) => {
              return <Card key={video.id} detail={video} type={"channel"} />;
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
    </>
  );
}

export default Channel;
