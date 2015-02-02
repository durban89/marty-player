/**
 * Created by pierre on 30.01.15.
 */
var Marty = require('marty');
var VideoConstants = require('constants/video_constants');

var VideoActionCreators = Marty.createActionCreators({
  setVideoArray: VideoConstants.SET_VIDEO_LIST(),
  setVideoName: VideoConstants.SET_VIDEO_NAME()
});

module.exports = VideoActionCreators;