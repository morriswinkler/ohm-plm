var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;


SectionProvider = function(host, port) {
  this.db= new Db('ohm-plm', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};



SectionProvider.prototype.getCollection= function(callback) {
  this.db.collection('sections', function(error, section_collection) {
    if( error ) callback(error);
    else callback(null, section_collection);
  });
};

//find all items
SectionProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, section_collection) {
      if( error ) callback(error)
      else {
        section_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new item
SectionProvider.prototype.save = function(items, callback) {
    this.getCollection(function(error, item_collection) {
      if( error ) callback(error)
      else {
        if( typeof(sections.length)=="undefined")
          sections = [sections];

        for( var i =0;i< sections.length;i++ ) {
          section = sections[i];
          section.created_at = new Date();
        }

        section_collection.insert(sections, function() {
          callback(null, sections);
        });
      }
    });
};

// add node
SectionProvider.prototype.addSection = function(path, section, callback) {
    this.getCollection(function(error, section_collection) {
	if( error ) callback(error)
	else {
	    var ancestorpath = section_collection.findOne({_id:'path'}).path;
	    ancestorpath += path
	    ancestorpath += ','
	    section_collection.insert({name:section, path:ancestorpath});
	}
    });
};


exports.SectionProvider = SectionProvider;


