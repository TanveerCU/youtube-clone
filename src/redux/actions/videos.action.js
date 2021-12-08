import {
  video,
  selectedVideo,
  relatedVideo,
  channelVideo,
  search,
  subscription,
} from "../actionType";
import request from "../../api";
export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: video.HOME_VIDEOS_REQUEST,
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "BD",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: video.HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: video.HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: video.HOME_VIDEOS_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",

        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video",
      },
    });

    dispatch({
      type: video.HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: video.HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: selectedVideo.SELECTED_VIDEO_REQUEST,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    dispatch({
      type: selectedVideo.SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: selectedVideo.SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: relatedVideo.RELATED_VIDEO_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    dispatch({
      type: relatedVideo.RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: relatedVideo.RELATED_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: channelVideo.CHANNEL_VIDEOS_REQUEST,
    });

    // 1. get upload playlist id
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });
    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;
    // 2. get the videos using the id
    const { data } = await request("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: channelVideo.CHANNEL_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: channelVideo.CHANNEL_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: search.SEARCHED_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",

        maxResults: 20,
        q: keyword,
        type: "video,channel",
      },
    });

    dispatch({
      type: search.SEARCHED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: search.SEARCHED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: subscription.SUBSCRIPTIONS_CHANNEL_REQUEST,
    });
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",

        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: subscription.SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: subscription.SUBSCRIPTIONS_CHANNEL_FAIL,
      payload: error.response.data,
    });
  }
};
