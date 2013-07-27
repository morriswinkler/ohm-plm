
/*
 * GET home page.
 */




exports.index = function(req, res){
    req.itemProvider.findAll(function(error, itms){
	res.render('index', {
	    titel: 'Items',
	    items: itms
	    });
    });
};


