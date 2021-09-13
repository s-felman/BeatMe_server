var Item = require("../models/item.js");
module.exports= function getItems() {async(req,res)=>{
console.log('get items')
try {
const item =await Item.find()
res.status(200).json(item);
} catch (error) {
res.status(404).json({ message: error.message });
}
}}
module.exports=  function createItem()
 { async(req,res)=>{
const item = new Item(req.body);
try {
await item.save();
res.status(201).json(item);
} catch (error) {
    console.log("err on createItem", error)
}
}}