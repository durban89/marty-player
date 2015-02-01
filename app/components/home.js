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
          <LeftMenu className="col-md-4" />
          <Player className="col-md-8" />
        </div>
      </div>
    );
  }
});

module.exports = Home;
