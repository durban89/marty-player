/**
 * Created by pierre on 30.01.15.
 */
var React = require('react');

var NavigationButtons = require('./navigation_buttons');
var Player = require('./player');

var PlayerContainer = React.createClass({
  render: function() {
    var videoList = this.props.videoList;
    var currentVideoName = this.props.videoName;

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
  }
});

module.exports = PlayerContainer;
