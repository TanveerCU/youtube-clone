import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  //   addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/comments.action";
import Comment from "./Comment";

const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.commentList.comments);

  //   const [text, setText] = useState("");

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  //   const handleComment = (e) => {
  //     e.preventDefault();
  //     if (text.length === 0) return;

  //     dispatch(addComment(videoId, text));

  //     setText("");
  //   };
  return (
    <>
      <p className="py-10 text-lg ">{totalComments} Comments</p>
      {/* <div >
        <img
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt=""
          
        />
        <form onSubmit={handleComment}>
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="p-2 border-0">Comment</button>
        </form>
      </div> */}
      <div>
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </>
  );
};

export default Comments;
