/**
 * Created by pierre on 30.01.15.
 */

module.exports = function (req, res) {
  var message = [ "videos/FranceUkraine.mp4", "videos/FranceItalie.mp4" ];
  res.json(message).status(201).end();
};
