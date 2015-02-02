/**
 * Created by pierre on 30.01.15.
 */
var React = require('react');

var Marty = require('marty');
var VideoStore = require('stores/video_store');
var VideoUtils = require('utils/video_utils');
var VideoActionCreators = require('actions/video_action_creators');

var LeftMenuState = Marty.createStateMixin({
  listenTo: [VideoStore],
  getState: function () {
    return {
      videoArray: VideoStore.getVideoArray()
    };
  }
});

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
  mixins: [LeftMenuState],

  handleMenuClick: function(videoName) {
    console.log("Clicked video : " + videoName);
    VideoActionCreators.setVideoName(videoName);
  },

  render: function() {
    var callback = this.handleMenuClick;
    var contentTag = this.state.videoArray.when({
      pending: function() {
        return <div>
          <span>Video list is loading...</span>
        </div>;
      },

      failed: function(error) {
        return <div>
          <span>List failed to load: {error.message}</span>
        </div>;
      },

      done: function(videoArray) {
        var videoList = VideoUtils.createListFromArray(videoArray);

        // Create a node for each video
        var videoNodeList = [];
        videoList.forEach(function(videoName) {
          videoNodeList.push(<VideoItem
            key={videoName}
            onMenuClick={callback}
            videoName={videoName} />);
        });

        return <div>
          <span>Video list</span>
          <ul>{videoNodeList}</ul>
        </div>;
      }
    });

    return <div className="left-menu-layout">
      {contentTag}
    </div>;
  }
});

module.exports = LeftMenu;
