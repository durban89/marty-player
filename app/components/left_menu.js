/**
 * Created by pierre on 30.01.15.
 */
var React = require('react');

var VideoActionCreators = require('actions/video_action_creators');

var VideoItem = React.createClass({
  render: function() {
    return <li>
      <a href="#" onClick={this.props.onMenuClick.bind(null, this.props.videoName)}>
        {this.props.videoName}
      </a>
    </li>;
  }
});

var LeftMenu = React.createClass({
  handleMenuClick: function(videoName) {
    VideoActionCreators.setVideoName(videoName);
  },

  render: function() {
    var callback = this.handleMenuClick;
    // Create a node for each video
    var videoNodeList = [];
    this.props.videoList.forEach(function(videoName) {
      videoNodeList.push(<VideoItem
        key={videoName}
        onMenuClick={callback}
        videoName={videoName} />);
    });

    return <div className="left-menu-layout">
      <ul>{videoNodeList}</ul>
    </div>;
  }
});

module.exports = LeftMenu;
