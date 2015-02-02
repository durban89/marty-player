/**
 * Created by pierre on 30.01.15.
 */
var Marty = require('marty');

var VideoActionCreators = require('actions/video_action_creators');

var VideoHttpApi = Marty.createStateSource({
  type: 'http',

  retrieveVideoArray: function() {
    // Return get promise
    return this.get('/films').then(function(response) {
      // Modify state when promise is fullfilled
      var videoArray = response.body;
      VideoActionCreators.setVideoArray(videoArray);
    });
  }
});

module.exports = VideoHttpApi;
