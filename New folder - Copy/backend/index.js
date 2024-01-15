const express = require('express');
const app = express();
const cors = require('cors'); 
const mongoose  = require('mongoose');
require('dotenv').config(); 
let port = process.env.PORT || 3001;

const userController = require('./controllers/usersController');
const blogPostController = require('./controllers/blogsController');
const courseController = require('./controllers/courseController');

//middlewares
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'))
const multer = require('multer');
const uploadMiddleware = multer({dest:"uploads/"});

mongoose.connect(process.env.MONGO_DB_URI).then(console.log("MongoDB connected"));

// User Routes
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/users', userController.getAllUsers); 
app.post('/user', userController.getUser); 
app.patch('/update-user-profile', userController.updateUserProfile); 
app.post('/change-password', userController.changePassword);
app.delete('/user', userController.deleteUserProfile);
app.post('/enroll', userController.enrollCourse);
app.post('/unenroll', userController.unenrollCourse);

// BlogPost Routes
app.get('/blogs', blogPostController.getAllBlogPosts);
app.get('/blogs/:id', blogPostController.getBlogPostById);
app.post('/blogs',uploadMiddleware.single('file'), blogPostController.createBlogPost);
app.put('/blogs', uploadMiddleware.single('file'), blogPostController.updateBlogPost);
app.delete('/blogs/:id', blogPostController.deleteBlogPost);

// Course Routes
app.get('/courses', courseController.getAllCourses);
app.get('/courses/:id', courseController.getCourseById);
app.post('/courses', uploadMiddleware.single('file'), courseController.createCourse);
app.put('/courses', uploadMiddleware.single('file'), courseController.updateCourse);
app.delete('/courses/:id', courseController.deleteCourse);

app.listen(port, () => {
  console.log("Server is listening");
});
