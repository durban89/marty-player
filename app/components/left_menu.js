/**
 * Created by pierre on 30.01.15.
 */
var React = require('react');

var Marty = require('marty');
var VideoStore = require('stores/video_store');

var LeftMenuState = Marty.createStateMixin({
  listenTo: [VideoStore],
  getState: function () {
    return {
      videoList: VideoStore.getVideoList()
    };
  }
});

var VideoItem = React.createClass({
  render: function() {
    // Wrong, use of action "setVideo" needed
    // onClick={this.props.menu.handleMenuClick.bind(null, this.props.videoName)}
    return <li>
      <a href="#" onClick={this.props.onMenuClick.bind(null, this.props.index)}>
        {this.props.videoName}
      </a>
    </li>;
  }
});

var LeftMenu = React.createClass({
  mixins: [LeftMenuState],

  handleMenuClick: function(videoName) {
    // Create video change action
    console.log("Clicked on : " + videoName);
  },

  render: function() {
    var callback = this.handleMenuClick;
    var contentTag = this.state.videoList.when({
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

      done: function(videoList) {
        var index = 0;
        var videoNodeList = videoList.map(function(videoName) {
          var tag = <VideoItem key={index}
            index={index}
            onMenuClick={callback}
            videoName={videoName} />;
          index++;
          return tag;
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
