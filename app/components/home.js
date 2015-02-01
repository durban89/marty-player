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
        <div className="row small-top-margin">
          <LeftMenu className="col-md-4 menu-space-layout" />
          <Player className="col-md-8 video-space-layout" />
        </div>
      </div>
    );
  }
});

module.exports = Home;
