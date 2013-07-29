
/*
 * GET home page.
 */


var mongoose = require('mongoose')
  , Section = mongoose.model('Section')
  


var GetSection = require('../models/part') 


exports.index = function(req, res){
    if(req.param('name')){
        req.session.sectionName = req.param('name')
    }
    
    

    function render(sectName, sects, subsects, path) { 
	
	console.log('name reached: ' + sectName);
	console.log('sect reached: ' + sects);
	console.log('sub reached: ' + subsects);


	res.render('parts', {
	    titel: 'Parts',
	    sectionName: sectName,
	    sections: sects,
	    subsections: subsects,
	    arrayPath: path,
	    sectionPath: req.session.sectionPath
	});

    };	
    
    if(req.session.sectionName == undefined){
	req.session.sectionPath = 'root,'
	
	Section.find({'path' : new RegExp('root,$', 'i')},function(error, sects){
	    var sectName = 'none'
	    var subsects = 'none'
	    var path = 'none'
	    
	    render(sectName, sects, subsects, path);
	    
	});
	
    } else { 
	
	Section.findOne({'name': req.session.sectionName}, 'name path', function(err, spath){
	    
	    req.session.sectionPath = spath.path
	    split_spath = spath.path.split(',')
	    split_spath.pop();
	    
	    var sections = []
	    var subsections 
	    
	    
	    Section.find({'path' : new RegExp(spath.name+',$', 'i')}, (function (err, result) {
		subsections = result
	    }))
	    
	    
	    // for each path in split_spath do
	    split_spath.forEach(function(path){
		
		Section.find({'path' : new RegExp(path+',$', 'i')}, (function (err, result) {
		    if (err) return handleError(err);
		    
		    sections.push(result);
		    
		    if(sections.length == split_spath.length){
			render(spath.name, sections, subsections, split_spath);
		    }
		    
		}))
		
	    })
	})
    }
};
	

exports.addSection = function(req, res){
    var newSection = new Section(req.body);
    newSection.save();
    res.redirect('/');
};

exports.setSection = function(req,res){
    req.session.sectionName = req.param('name')
    res.redirect('/');
    

};
