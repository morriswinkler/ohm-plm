var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

PartProvider = function(host, port) {
  this.db= new Db('node-mongo-item', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};



PartProvider.prototype.getCollection= function(callback) {
  this.db.collection('parts', function(error, item_collection) {
    if( error ) callback(error);
    else callback(null, item_collection);
  });
};

//find all items
PartProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, item_collection) {
      if( error ) callback(error)
      else {
        item_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new item
PartProvider.prototype.save = function(items, callback) {
    this.getCollection(function(error, item_collection) {
      if( error ) callback(error)
      else {
        if( typeof(parts.length)=="undefined")
          parts = [parts];

        for( var i =0;i< parts.length;i++ ) {
          part = parts[i];
          part.created_at = new Date();
        }

        part_collection.insert(parts, function() {
          callback(null, parts);
        });
      }
    });
};

exports.PartProvider = PartProvider;


