/** @jsx React.DOM */
var React = require('react');

var Header = require('./header');
var LeftMenu = require('./left_menu');
var Player = require('./player');

var Home = React.createClass({
  render: function () {
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-md-4">
            <LeftMenu className="menu-space-layout" />
          </div>
          <div className="col-md-8">
            <Player className="video-space-layout" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
