const fs = require('fs');
const Course = require('../models/course');
// const multer = require('multer');
// const uploadMiddleware = multer({dest:"uploads/courses/"});

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ updatedAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCourseById = async (req, res) => {
  const {id} = req.params;
  const courseDoc = await Course.findById(id);
  res.json(courseDoc);
};

const createCourse = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = 'uploads/courses/' + parts[0] + '.' + extension;
    fs.renameSync(path, newPath);
    const { title, overview, outcome, content, requirements, difficulty, fees,quiz } = req.body;
    // console.log(req.body);
    const courseDoc = await Course.create({
      title,
      overview,
      outcome,
      content,
      requirements,
      quiz,
      difficulty,
      fees,
      cover: newPath,
    });
  // console.log(courseDoc);
    res.json({ courseDoc });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Course title already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const updateCourse = async (req, res) => {
  let newPath = null;
  if(req.file){
    const {originalname,path} = req.file;
    const parts = originalname.split('.')
    const extension = parts[parts.length-1]
    newPath = "uploads/courses/"+parts[0]+'.'+extension
    fs.renameSync(path,newPath); 
  }
  const {id,title,overview,outcome,content,requirements,difficulty,fees,quiz
  } = req.body;
  const courseDoc = await Course.findById(id);
  await courseDoc.updateOne({title,overview,outcome,content,requirements,difficulty,fees,cover:newPath?newPath:courseDoc.cover,quiz,});
  res.json(courseDoc);
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
    const courseDoc = await Course.findByIdAndDelete(id);
    if (!courseDoc) {
    return res.status(404).json({ message: "Course not found" });
    }
    fs.unlinkSync(courseDoc.cover);
    res.json({ message: "Course deleted successfully" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
