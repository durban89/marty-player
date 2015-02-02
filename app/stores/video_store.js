/**
 * Created by pierre on 30.01.15.
 */
var Marty = require('marty');

var VideoConstants = require('constants/video_constants');
var VideoHttpApi = require('sources/video_http_api');

var VideoStore = Marty.createStore({
  displayName: 'video_store',
  handlers: {
    setVideoName: VideoConstants.SET_VIDEO_NAME,
    setVideoArray: VideoConstants.SET_VIDEO_ARRAY
  },

  getInitialState: function() {
    return {
      initialIndex: 0
    }
  },

  setVideoName: function(videoName) {
    this.state.currentVideoName = videoName;
    this.hasChanged();
  },

  setVideoArray: function(videoArray) {
    this.state.videoArray = videoArray;
    this.state.currentVideoName = videoArray[this.state.initialIndex];
    this.hasChanged();
  },

  getVideoArray: function() {
    return this.fetch({
      id: 'video_list',
      locally: function() {
        return this.state.videoArray;
      },
      remotely: function() {
        // If remotely returns a fullfilled promise,
        // then locally is called
        return VideoHttpApi.retrieveVideoArray();
      }
    });
  },

  getCurrentVideoName: function() {
    return this.state.currentVideoName;
  }
});

module.exports = VideoStore;