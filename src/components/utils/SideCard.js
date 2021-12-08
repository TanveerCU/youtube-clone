import React, { useEffect, useState } from "react";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";

function SideCard({ video }) {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [id]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const history = useHistory();
  const handleClick = () => {
    // TODO handle channel click
    history.push(`/individualvideo/${id.videoId}`);
  };

  const handleChannel = () => {
    history.push(`/channel/${channelId}`);
  };

  return (
    <div className="w:full flex space-x-2 overflow-hidden">
      <img
        src={medium.url}
        alt=""
        height="92px"
        width="167px"
        onClick={handleClick}
        className="cursor-pointer"
      />

      <div className="flex-1 flex flex-col space-y-1">
        <p
          className="truncate font-semibold cursor-pointer  truncate"
          //   onClick={handleIndividualVideo}
        >
          {title}
        </p>
        <p
          className="truncate font-semibold text-gray-500 cursor-pointer"
          onClick={handleChannel}
        >
          {channelTitle}
        </p>
        <div
          className="flex space-x-1 cursor-pointer"
          //   onClick={handleIndividualVideo}
        >
          <p>{numeral(views).format("0.a")} Views</p>
          <span>•</span>
          <p>{moment(publishedAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}

export default SideCard;
