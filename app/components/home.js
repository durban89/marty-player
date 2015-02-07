/** @jsx React.DOM */
var React = require('react');

var Marty = require('marty');
var VideoStore = require('stores/video_store');
var VideoUtils = require('utils/video_utils');

var Header = require('./header');
var LeftMenu = require('./left_menu');
var PlayerContainer = require('./player_container');

var HomeState = Marty.createStateMixin({
  listenTo: [VideoStore],
  getState: function () {
    return {
      videoArray: VideoStore.getVideoArray(),
      videoName: VideoStore.getCurrentVideoName()
    };
  }
});

var Home = React.createClass({
  mixins: [HomeState],

  render: function () {
    var homeState = this.state;
    return homeState.videoArray.when({
      pending: function() {
        return <div>
          <span>Player is loading</span>
        </div>
      },

      failed: function(error) {
        return <div>
          <span>Player failed to load: {error.message}</span>
        </div>
      },

      done: function(videoArray) {
        var videoList = VideoUtils.createListFromArray(videoArray);
        var videoName = homeState.videoName;

        var rowContent;
        if (!videoList.isEmpty()) {
          rowContent = <div>
            <div className="col-md-4">
              <LeftMenu className="menu-space-layout" videoList={videoList} />
            </div>
            <div className="col-md-8">
              <PlayerContainer className="video-space-layout" videoList={videoList} videoName={videoName} />
            </div>
          </div>;
        } else {
          rowContent = <div className="alert alert-warning" role="alert">
            There are no videos to play. Put MP4 videos in <strong>/videos</strong>.
          </div>;
        }

        return <div className="container">
          <Header />
          <div className="row">
            {rowContent}
          </div>
        </div>
      }
    });
  }
});

module.exports = Home;
