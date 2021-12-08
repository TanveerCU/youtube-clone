import React, { useEffect } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";
import { useHistory } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelDetails,
  checkSubscriptionStatus,
} from "../../redux/actions/channel.action";

function MetaData({ video: { snippet, statistics }, videoId }) {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  let dispatch = useDispatch();

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);
  let history = useHistory();
  return (
    <div className="w-full flex flex-col space-y-3">
      <div>
        <p className="text-lg font-medium pt-5">{title}</p>
      </div>
      <div className="flex ">
        <div className="flex-1 ">
          <div
            className="flex space-x-1 "
            //   onClick={handleIndividualVideo}
          >
            <p>
              {numeral(viewCount).format("0.a")}
              {/* 3k Views */}
            </p>
            <span>•</span>
            <p>{moment(publishedAt).fromNow()}</p>
          </div>
        </div>

        <div className="w-auto flex space-x-2 sm:pr-8 pr-1">
          <div className="flex items-center space-x-1">
            <ThumbUpAltOutlinedIcon className="cursor-pointer" />
            <p> {numeral(likeCount).format("0.a")}</p>
          </div>
          <div className="flex items-center space-x-1">
            <ThumbDownAltOutlinedIcon className="cursor-pointer" />
            <p> {numeral(dislikeCount).format("0.a")}</p>
          </div>
          <ScreenShareOutlinedIcon className="cursor-pointer" />
        </div>
      </div>
      <hr />

      {/* channel  +  Detailed  */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={channelSnippet?.thumbnails?.default?.url}
              alt="logo"
              className="rounded-full"
            />
            <div>
              <p
                className="font-semibold cursor-pointer"
                onClick={() => {
                  history.push(`/channel/${channelId}`);
                }}
              >
                {channelTitle}
              </p>
              <p className="text-xs">
                {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
                subscribers
              </p>
            </div>
          </div>
          <div>
            <span
              className="px-6 py-3 text-white font-bold rounded-sm cursor-pointer"
              style={{ backgroundColor: "#FF0000" }}
            >
              {subscriptionStatus ? "Subscribed" : "Subscribe"}
            </span>
          </div>
        </div>
        <div className="flex space-x-4">
          <div style={{ height: "50px", width: "50px" }}></div>
          <div style={{ width: "60%" }}>
            <ShowMoreText
              lines={3}
              more="SHOW MORE"
              less="SHOW LESS"
              anchorClass="showMoreText"
              expanded={false}
            >
              {description}
            </ShowMoreText>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default MetaData;
