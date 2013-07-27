var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ItemProvider = function(host, port) {
  this.db= new Db('node-mongo-item', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};



ItemProvider.prototype.getCollection= function(callback) {
  this.db.collection('items', function(error, item_collection) {
    if( error ) callback(error);
    else callback(null, item_collection);
  });
};

//find all items
ItemProvider.prototype.findAll = function(callback) {
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
ItemProvider.prototype.save = function(items, callback) {
    this.getCollection(function(error, item_collection) {
      if( error ) callback(error)
      else {
        if( typeof(items.length)=="undefined")
          items = [items];

        for( var i =0;i< items.length;i++ ) {
          item = items[i];
          item.created_at = new Date();
        }

        item_collection.insert(items, function() {
          callback(null, items);
        });
      }
    });
};

exports.ItemProvider = ItemProvider;
