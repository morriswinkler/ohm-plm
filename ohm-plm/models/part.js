var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var SectionSchema = new Schema({
  createdAt : { type: Date, default: Date.now },
  name : { type: String, required: true, index: { unique: true } },
  desc : { type: String, required: true },
  path : { type: String, required: true, default: 'root' }
});


module.exports = mongoose.model('Section', SectionSchema);

var Section = mongoose.model('Section');

// price per unit is saved as integer so allways divide by 100

var PartSchema = new Schema({
  createdAt : { type: Date, default: Date.now },
  name : { type: String, required: true, index: { unique: true } },
  desc : { type: String, required: true },
  path : { type: String, required: true, default: 'root,' },
  image: { type: String}, 
  in_stock: {type: Number, default: 0},
  price: { type: Number, default: 0},
  last_purchase: [{ type: Schema.Types.ObjectId }]
});


module.exports = mongoose.model('Part', PartSchema);

var Part = mongoose.model('Part');



