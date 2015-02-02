/**
 * Created by pierre on 02.02.15.
 */
var React = require('react');

var VideoActionCreators = require('actions/video_action_creators');

var NavigationButtons = React.createClass({

  handleVideoChangeButtonClick: function(videoName) {
    VideoActionCreators.setVideoName(videoName);
  },

  craftNavigationButton: function(videoName, label, itemKey, handlerFunction) {
    var button;
    if (videoName !== null) {
      button = <button key={itemKey} onClick={handlerFunction.bind(null, videoName)}
          className="btn btn-primary btn-large">
          {label}
      </button>;
    } else {
      button = <button key={itemKey} className="btn btn-primary btn-large" disabled="disabled">
        {label}
      </button>;
    }

    return button;
  },

  render: function() {
    var callback = this.handleVideoChangeButtonClick;

    var buttonArray = [];
    buttonArray.push(
      this.craftNavigationButton(
        this.props.previousVideoName, "Previous", "previous", callback));

    buttonArray.push(
      this.craftNavigationButton(
        this.props.nextVideoName, "Next", "next", callback));

    return <div className="btn-group" role="group" aria-label="...">{buttonArray}</div>;
  }
});

module.exports = NavigationButtons;
