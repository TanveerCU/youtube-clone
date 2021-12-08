import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import {
  homeVideosReducer,
  relatedVideoReducer,
  selectedVideoReducer,
  searchedVideosReducer,
  channelVideosReducer,
  subscriptionsChannelReducer,
} from "./video.reducer";
import { channelDetailsReducer } from "./channel.reducer";
import { commentListReducer } from "./comments.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
  searchedVideos: searchedVideosReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  channelVideos: channelVideosReducer,
});
