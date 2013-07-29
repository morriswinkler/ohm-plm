var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var SectionSchema = new Schema({
  createdAt : { type: Date, default: Date.now },
  name : { type: String, required: true, index: { unique: true } },
  path : { type: String, required: true, default: 'root' }
});


module.exports = mongoose.model('Section', SectionSchema);

var Section = mongoose.model('Section');

exports.getBreadcrumbs = function(sectionName, error, callback){

    return Section.find(function(err, breadcrumbs){
    
	var tmp_path = Section.findOne({'name': SectionName});
	var split_tmp_path = tmp_path.path.path.split(',');
	console.log('tmp_path = ' + split_tmp_path[0]);
    
    });
};




