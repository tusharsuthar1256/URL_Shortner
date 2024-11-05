const mongoose = require('mongoose');

const  urlSchema = mongoose.Schema({
     shortId:{
          type:String,
          required : false,
          unique : true
     },
     redirectURL:{
          type: String,
          required : true
     },
     visitHistory:[ { timestamps : {  type : Number } } ]
},{
     timestamps : true,
})

const  URL = mongoose.model('url', urlSchema);

module.exports = URL;

