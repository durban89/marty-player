/**
 * Created by pierre on 30.01.15.
 */
var React = require('react');

var Marty = require('marty');
var VideoStore = require('stores/video_store');
var VideoUtils = require('utils/video_utils');
var NavigationButtons = require('./navigation_buttons');

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

  componentDidUpdate: function() {
    // If video tag is rendered, then we load the new video
    var videoTagRef = this.refs.video_tag;
    if (videoTagRef) {
      var videoTag = videoTagRef.getDOMNode();
      videoTag.load();
    }
  },

  handleNavigationButtonClick: function(videoName) {
    console.log("Navigated to video : " + videoName);
  },

  render: function() {
    var playerState = this.state;
    var callback = this.handleNavigationButtonClick;

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
        var videoFilename = playerState.videoName;
        var previousVideoName = videoList.getPrevious(videoFilename);
        var nextVideoName = videoList.getNext(videoFilename);

        return <div>
            <div>
              <video ref="video_tag" className="video-player-layout"
                width="800" height="600"
                controls autoPlay>
                <source src={videoFilename} type="video/mp4"></source>
                <span>Your browser does not support the video tag.</span>
              </video>
            </div>

            <div className="small-top-margin">
              <NavigationButtons previousVideoName={previousVideoName}
                nextVideoName={nextVideoName} />
            </div>
        </div>;
      }
    });
  }
});

module.exports = PlayerContainer;
