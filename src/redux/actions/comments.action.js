import request from "../../api";
import { comment, createComment } from "../actionType";
export const getCommentsOfVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: comment.COMMENT_LIST_REQUEST,
    });

    const { data } = await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });
    dispatch({
      type: comment.COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: comment.COMMENT_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addComment = (id, text) => async (dispatch, getState) => {
  try {
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    await request.post("/commentThreads", obj, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: createComment.CREATE_COMMENT_SUCCESS,
    });

    setTimeout(() => dispatch(getCommentsOfVideoById(id)), 3000);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: createComment.CREATE_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
