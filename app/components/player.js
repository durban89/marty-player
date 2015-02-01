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
      videoList: VideoStore.getVideoList(),
      videoIndex: VideoStore.getCurrentVideoIndex()
    };
  }
});

var Player = React.createClass({
  mixins: [PlayerState],

  componentDidUpdate: function() {
    // Wrong, this code should be executed by an action
    //var videoTag = this.refs.videotag.getDOMNode();
    //if (this.props.videoFilename !== null) {
    //  videoTag.load();
    //  videoTag.play();
    //}
  },

  render: function() {
    return this.state.videoList.when({
      pending: function() {
        return <div>
          <span>Video is loading.</span>
        </div>
      },

      failed: function() {
        return <div>
          <span>Video failed to load.</span>
        </div>
      },

      done: function(videoList) {
        var videoFilename = videoList[this.state.videoIndex];
        return <div>
            <div>
              <video ref="videotag" className="video-player-layout"
                width="800" height="600"
                controls autoPlay>
                <span>Your browser does not support the video tag.</span>
                <source src={videoFilename} type="video/mp4"></source>
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
