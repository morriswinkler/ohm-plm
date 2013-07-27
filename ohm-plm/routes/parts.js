
/*
 * GET home page.
 */

SectionProvider = require('../models/sectionprovider').SectionProvider;
var sectionProvider= new  SectionProvider('localhost', 27017);


exports.index = function(req, res){
    sectionProvider.findAll(function(error, sects){
    if (typeof req.session.section_path == 'undefined') {
	req.session.section_path = ''
	console.log('initalice section_path');
    } else {
	console.log('section_path = ' + req.session.section_path);
    }


	res.render('parts', {
	    titel: 'Parts',
	    sections: sects,
	    path: req.session.section_path
	    });
    });
};


