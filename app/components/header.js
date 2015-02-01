/**
 * Created by pierre on 30.01.15.
 */
var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="page-header">
          <h2>Remote MP4 player <small>pwalch</small></h2>
        </div>
      </div>
    );
  }
});

module.exports = Header;
