/**
 * Created by pierre on 30.01.15.
 */

var path = require('path');
var glob = require('glob');

module.exports = function (req, res) {
  var absolutePathToVideos = path.join(__dirname, '..', '..', "..", 'dist', "videos");
  glob(absolutePathToVideos + "/*.mp4", function (error, fileArray) {
    var message = fileArray.map(function(absolutePath) {
      return absolutePath.replace(/^.*dist\/videos/, 'videos');
    });
    res.json(message).status(201).end();
  })
};