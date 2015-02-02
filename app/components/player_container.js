/**
 * Created by pierre on 30.01.15.
 */
var React = require('react');

var Marty = require('marty');

var VideoStore = require('stores/video_store');
var VideoUtils = require('utils/video_utils');
var NavigationButtons = require('./navigation_buttons');
var Player = require('./player');

var PlayerContainerState = Marty.createStateMixin({
  listenTo: [VideoStore],
  getState: function () {
    return {
      videoArray: VideoStore.getVideoArray(),
      videoName: VideoStore.getCurrentVideoName()
    };
  }
});

var PlayerContainer = React.createClass({
  mixins: [PlayerContainerState],

  render: function() {
    var playerState = this.state;
    return playerState.videoArray.when({
      pending: function() {
        return <div>
          <span>Video is loading.</span>
        </div>
      },

      failed: function(error) {
        return <div>
          <span>Video failed to load: {error.message}</span>
        </div>
      },

      done: function(videoArray) {
        var videoList = VideoUtils.createListFromArray(videoArray);
        if (!videoList.isEmpty()) {
          var currentVideoName = playerState.videoName;
          var previousVideoName = videoList.getPrevious(currentVideoName);
          var nextVideoName = videoList.getNext(currentVideoName);

          return <div>
            <Player videoFilename={currentVideoName} />

            <div className="small-top-margin">
              <NavigationButtons
                previousVideoName={previousVideoName}
                nextVideoName={nextVideoName} />
            </div>
          </div>;
        } else {
          return <div className="alert alert-warning" role="alert">
            There are no videos to play.
          </div>;
        }
      }
    });
  }
});

module.exports = PlayerContainer;
