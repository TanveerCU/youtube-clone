import React from "react";
import moment from "moment";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

function Comment({ comment }) {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  return (
    <div className="flex space-x-5">
      <div
        style={{ width: "50px", height: "50px" }}
        // className="border border-black"
      >
        <img
          src={authorProfileImageUrl}
          alt="logo"
          className="rounded-full"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <div className="flex flex-col space-y-1" style={{ width: "90%" }}>
        <div className="flex items-center space-x-1">
          <p className="font-medium"> {authorDisplayName}</p>
          <p className="text-xs">{moment(publishedAt).fromNow()}</p>
        </div>
        <p>{textDisplay} </p>
        <div className="flex space-x-3 pt-3 h-5">
         
        </div>
      </div>
    </div>
  );
}

export default Comment;
