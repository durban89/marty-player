/**
 * Created by pierre on 30.01.15.
 */
var Marty = require('marty');

var VideoActionCreators = require('actions/video_action_creators');

var VideoHttpApi = Marty.createStateSource({
  type: 'http',

  getVideoList: function() {
    return this.get('/films').then(function(response) {
      VideoActionCreators.setVideoList(response.body);
      return response;
    });
  }
});

module.exports = VideoHttpApi;
