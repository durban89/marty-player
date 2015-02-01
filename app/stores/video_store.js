/**
 * Created by pierre on 30.01.15.
 */
var Marty = require('marty');

var VideoConstants = require('constants/video_constants');
var VideoHttpApi = require('sources/video_http_api');

var VideoStore = Marty.createStore({
  displayName: 'video_store',
  handlers: {
    setVideoIndex: VideoConstants.SET_VIDEO_INDEX,
    setVideoList: VideoConstants.SET_VIDEO_LIST
  },

  getInitialState: function() {
    return {
      currentVideoIndex: 0
    };
  },

  setVideoIndex: function(videoIndex) {
    this.state.currentVideoIndex = videoIndex;
  },

  setVideoList: function(videoList) {
    this.state.videoList = videoList;
  },

  getVideoList: function() {
    return this.fetch({
      id: 'video_list',
      locally: function() {
        return this.state.videoList;
      },
      remotely: function() {
        // If remotely returns a fullfilled promise,
        // then locally is called
        return VideoHttpApi.retrieveVideoList();
      }
    });
  },

  getCurrentVideoIndex: function() {
    return this.state.currentVideoIndex;
  }
});

module.exports = VideoStore;