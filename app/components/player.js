/**
 * Created by pierre on 02.02.15.
 */
var React = require('react');

var Player = React.createClass({
  componentDidUpdate: function() {
    // If video tag is rendered, then we load the new video
    var videoTagRef = this.refs.video_tag;
    if (videoTagRef) {
      var videoTag = videoTagRef.getDOMNode();
      videoTag.load();
    }
  },

  render: function() {
    return <div>
      <video ref="video_tag" className="video-player-layout"
        width="800" height="600"
        controls autoPlay>
        <source src={this.props.videoFilename} type="video/mp4"></source>
        <span>Your browser does not support the video tag.</span>
      </video>
    </div>
  }
});

module.exports = Player;

