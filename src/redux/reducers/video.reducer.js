import {
  video,
  selectedVideo,
  relatedVideo,
  search,
  subscription,
  channelVideo,
} from "../actionType";

const initialState = {
  videos: [],
  nextPageToken: null,
  loading: false,
  activeCategory: "All",
};
export const homeVideosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case video.HOME_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case video.HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    case video.HOME_VIDEOS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case selectedVideo.SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case selectedVideo.SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false,
      };
    case selectedVideo.SELECTED_VIDEO_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const relatedVideoReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case relatedVideo.RELATED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case relatedVideo.RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case relatedVideo.RELATED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const searchedVideosReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case search.SEARCHED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case search.SEARCHED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case search.SEARCHED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const subscriptionsChannelReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case subscription.SUBSCRIPTIONS_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case subscription.SUBSCRIPTIONS_CHANNEL_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case subscription.SUBSCRIPTIONS_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const channelVideosReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case channelVideo.CHANNEL_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case channelVideo.CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case channelVideo.CHANNEL_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
