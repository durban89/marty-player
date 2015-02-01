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
        // Don't know if this function "remotely" is supposed
        // to return something or not
        return VideoHttpApi.getVideoList();
      }
    });
  },

  getCurrentVideoFilename: function() {
    // Can we do this "then" to transform results ?
    return this.getVideoList().then(function(videoList) {
      return videoList[this.state.currentVideoIndex];
    });
  }
});

module.exports = VideoStore;