const fs = require('fs');
const BlogPost = require('../models/blog');

const getAllBlogPosts = async (req, res) => {
  // const { category } = req.query; 
  // const filter = category ? { category: category } : {};
  try {
    // const posts = await BlogPost.find(filter).sort({ updatedAt: -1 });
    const posts = await BlogPost.find().sort({ updatedAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogPostById = async (req, res) => {
  const {id} = req.params;
  const postDoc = await BlogPost.findById(id);
  res.json(postDoc);
};

const createBlogPost = async (req, res) => {
  // console.log(req.file);
  const {originalname,path} = req.file;
  const parts = originalname.split('.')
  const extension = parts[parts.length-1]
  const newPath = "uploads/blogs/"+parts[0]+'.'+extension
  fs.renameSync(path,newPath); 
    // const newPath = path+'.'+extension
    // fs.renameSync(path,path+'.'+extension); 
    // res.json({files : req.file});
  const {title,content,category} = req.body;
  // console.log(req.body)
  const postDoc = await BlogPost.create({
    title,
    content,
    category,
    cover:newPath,
  });
  res.json({postDoc});
};

const updateBlogPost = async (req, res) => {
  let newPath = null;
  if(req.file){
    const {originalname,path} = req.file;
    const parts = originalname.split('.')
    const extension = parts[parts.length-1]
    newPath = "uploads/blogs/"+parts[0]+'.'+extension
    fs.renameSync(path,newPath); 
  }

  const {id,title,category,content} = req.body;
  const postDoc = await BlogPost.findById(id);
  await postDoc.updateOne({
    title,
    content,
    category,
    cover:newPath?newPath:postDoc.cover,
  });
  res.json(postDoc);
};


const deleteBlogPost = async (req, res) => {
    const { id } = req.params;
    try {
    const postDoc = await BlogPost.findByIdAndDelete(id);
    if (!postDoc) {
    return res.status(404).json({ message: "Blog post not found" });
    }
    fs.unlinkSync(postDoc.cover);
    res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };

module.exports = {
    getAllBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    };