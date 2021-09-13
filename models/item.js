 var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
title:String,
image:String
},{ timestamps: true })
var Item = mongoose.model('Item',itemSchema);
module.exports = new Item();