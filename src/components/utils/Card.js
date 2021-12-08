import React, { useEffect, useState } from "react";
import moment from "moment";
import numeral from "numeral";
import request from "../../api";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Card({ detail, type }) {
  const [channelIcon, setChannelIcon] = useState(null);
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  let history = useHistory();
  let {
    id,
    snippet: {
      thumbnails: {
        medium: { url },
      },
      channelId,
      title,
      publishedAt,
      channelTitle,
      resourceId,
    },
    contentDetails,
    // statistics: { viewCount },
  } = detail;
  const _videoId = id?.videoId || contentDetails?.videoId || id;
  const _channelId = resourceId?.channelId || channelId
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [_videoId]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default.url);
    };
    get_channel_icon();
  }, [channelId]);

  const handleIndividualVideo = (id) => {
    history.push(`/individualvideo/${_videoId}`);
  };

  const handleChannel = (id) => {
    history.push(`/channel/${_channelId}`);
  };

  return (
    <div className="mt-10 w-11/12 h-80 sm:w-80 sm:h-80 xl:w-72 xl:h-72 lg:h-56 lg:w-56 md:w-72 md:h-72 flex flex-col p-2 ">
      {/* Image part 60%  */}
      <div className="w-full h-3/5 relative">
        <div className="absolute bottom-2.5 right-0 px-1 bg-black opacity-80">
          <p className="text-white">{_duration}</p>
        </div>
        {/* <img
          src={url}
          alt="image"
          className="w-full h-full cursor-pointer"
          onClick={() => {
            handleIndividualVideo(id);
          }}
        /> */}
        <LazyLoadImage
          src={url}
          alt="image"
          className="w-full h-full cursor-pointer"
          onClick={() => {
            handleIndividualVideo(id);
          }}
          effect="blur"
        />
      </div>

      {/* 40% text information */}
      {type === "channel" ? (
        <div className="pt-5">
          <p
            className="truncate font-semibold cursor-pointer"
            onClick={handleIndividualVideo}
          >
            {title}
          </p>
          <div
            className="flex space-x-1 cursor-pointer pt-1"
            onClick={handleIndividualVideo}
          >
            <p>{numeral(views).format("0.a")} Views</p>
            <span>•</span>
            <p>{moment(publishedAt).fromNow()}</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-2/5 flex flex-col">
          <div className="h-1/2 w-full flex space-x-1 items-center">
            {/* <img
              src={channelIcon}
              alt="image"
              className="w-11 h-11 rounded-full p-1 cursor-pointer"
            /> */}

            <LazyLoadImage
              src={channelIcon}
              alt="image"
              className="w-11 h-11 rounded-full p-1 cursor-pointer"
              effect="blur"
            />

            <div className="h-11  flex-1 truncate flex items-center">
              <p
                className="truncate font-semibold cursor-pointer"
                onClick={handleIndividualVideo}
              >
                {title}
              </p>
            </div>
          </div>

          <div className="h-1/2 w-full flex space-x-1 items-center">
            <div className="w-11 h-11 rounded-full  p-1"></div>

            <div className="h-12  flex-1 flex flex-col">
              <p
                className="truncate font-semibold text-gray-500 cursor-pointer"
                onClick={handleChannel}
              >
                {channelTitle}
              </p>

              <div
                className="flex space-x-1 cursor-pointer"
                onClick={handleIndividualVideo}
              >
                <p>{numeral(views).format("0.a")} Views</p>
                <span>•</span>
                <p>{moment(publishedAt).fromNow()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
