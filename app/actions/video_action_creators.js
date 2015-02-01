/**
 * Created by pierre on 30.01.15.
 */
var Marty = require('marty');
var VideoConstants = require('constants/video_constants');

var VideoActionCreators = Marty.createActionCreators({
  setVideoList: VideoConstants.SET_VIDEO_LIST(),
  setVideoIndex: VideoConstants.SET_VIDEO_INDEX()
});

module.exports = VideoActionCreators;