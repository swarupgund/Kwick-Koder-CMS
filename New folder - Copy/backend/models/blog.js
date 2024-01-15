const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const BlogPostSchema = new Schema({
    title : String,
    content : String,
    cover : String,
    category: String, 
},{
    timestamps:true,
});

const BlogPostModel = model('BlogPost',BlogPostSchema)

module.exports = BlogPostModel;