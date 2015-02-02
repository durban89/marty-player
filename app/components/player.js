/**
 * Created by pierre on 30.01.15.
 */
var React = require('react');

var Marty = require('marty');
var VideoStore = require('stores/video_store');

var PlayerState = Marty.createStateMixin({
  listenTo: [VideoStore],
  getState: function () {
    return {
      videoArray: VideoStore.getVideoArray(),
      videoName: VideoStore.getCurrentVideoName()
    };
  }
});

var Player = React.createClass({
  mixins: [PlayerState],

  componentDidUpdate: function() {
    // If video tag is rendered, then we load the new video
    var videoTagRef = this.refs.video_tag;
    if (videoTagRef) {
      var videoTag = videoTagRef.getDOMNode();
      videoTag.load();
    }
  },

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
        var videoFilename = playerState.videoName;
        return <div>
            <div>
              <video ref="video_tag" className="video-player-layout"
                width="800" height="600"
                controls autoPlay>
                <source src={videoFilename} type="video/mp4"></source>
                <span>Your browser does not support the video tag.</span>
              </video>
            </div>

            <br/>

            <p>
              <button className="btn btn-primary btn-large">Previous</button>
              <button className="btn btn-primary btn-large">Shuffle</button>
              <button className="btn btn-primary btn-large">Next</button>
            </p>
        </div>;
      }
    });
  }
});

module.exports = Player;
