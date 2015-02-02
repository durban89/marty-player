/**
 * Created by pierre on 01.02.15.
 */

var DoublyLinkedList = require('doubly-linked-list-js');
var _ = require('underscore');

module.exports = {
  createListFromArray: function(array) {
    var list = new DoublyLinkedList();
    for (var i = 0; i < array.length; ++i) {
      list.add(array[i]);
    }
    return list;
  },

  arrayToObject: function(array) {
    var aggregator = {};
    for (var i = 0; i < array.length; ++i)
      aggregator[i] = array[i];
    return aggregator;
  },

  objectToArray: function(object) {
    return _.values(object);
  }
};


