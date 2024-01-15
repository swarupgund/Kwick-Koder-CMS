const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const secretKey = "KwikodersIsGreat"
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const User = require('../models/user');
const Course = require('../models/course');

const register = async (req,res)=>{
    const {name,mail,mobile,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            mail,
            mobile,
            password:bcrypt.hashSync(password,salt),
            enrolledCourses : [],
        });
        // console.log("user created");
        res.json(userDoc); 
    }catch(error){
        if(error.code === 11000)
            res.status(400).json({message : "Email Already Exists"});
        else
            res.status(400).json({message: error})
    }
}

const login = async (req,res)=>{
    const {mail,password} = req.body;
    // console.log(req.body);
    const userDoc = await User.findOne({mail}).maxTimeMS(30000);

    //returns custom error if email not registered
    if(!userDoc){return res.status(400).json({message : "Email Not Found"});}
    //compares password  
    const result = bcrypt.compareSync(password,userDoc.password);

    if(result){
        let isAdmin = false; // Assume user is not an admin by default
        // Check if the user is an admin based on the email and password from environment variables
        if (mail === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            isAdmin = true;
            // console.log("inside admin check");
        }
        jwt.sign({mail,id:userDoc._id},secretKey,{},(err,token)=>{
            if(err) throw err;
            res.send({mail,token,isAdmin});
        });
    }else{
        res.status(401).json({message : "Wrong Password"});
    }
}

const getAllUsers = async (req, res) => {
    // console.log("ALL USERS")
    try {
      const users = await User.find({},'name mail mobile'); // Retrieve only the required fields
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }

const getUser = async (req, res) => {
  // console.log("recieved")
    const { mail } = req.body;
    try {
    const userDoc = await User.findOne({mail}).select("-password").maxTimeMS(30000);
      if (userDoc) {
        const { name, mail, mobile ,_id,enrolledCourses} = userDoc;
        res.json({name,mail,mobile,_id,enrolledCourses});
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }

  const updateUserProfile = async (req, res) => {
    const { mail, name, mobile } = req.body;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { mail },
        { $set: { name, mobile } },
        { new: true, fields: "-password" }
      );
      if (updatedUser) {
        res.json(updatedUser);
        // console.log(updatedUser)
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update user profile" });
    }
  };

  const changePassword = async (req, res) => {
    const { mail, currentPassword, newPassword } = req.body;
    try {
      const userDoc = await User.findOne({ mail }).maxTimeMS(30000);
      if (!userDoc) {
        return res.status(400).json({ success: false, message: 'Email not found' });
      }
      const result = bcrypt.compareSync(currentPassword, userDoc.password);
      if (result) {
        userDoc.password = bcrypt.hashSync(newPassword, salt);
        await userDoc.save();
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Incorrect current password' });
      }
    } catch (error) {
        console.log('Error changing password:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  const deleteUserProfile = async (req, res) => {
    const { mail } = req.body;
    try {
      const deletedUser = await User.findOneAndDelete({ mail });
      if (deletedUser) {
        res.json({ message: 'User profile deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user profile' });
    }
  };

  const enrollCourse = async (req, res) => {
    const { userId, courseId } = req.body;
    try {
      // Check if the user and course exist
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);
      if (!user || !course) {
        return res.status(404).json({ message: 'User or course not found' });
      }
      // Check if the user is already enrolled in the course
      if (user.enrolledCourses.includes(courseId)) {
        return res.status(400).json({ message: 'User is already enrolled in the course' });
      }
      // Enroll the user in the course
      user.enrolledCourses.push(courseId);
      await user.save();
      res.status(200).json({ message: 'Enrollment successful' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to enroll user in the course' });
    }
  }

  const unenrollCourse = async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      // Find the user by ID and remove the courseId from the enrolledCourses array
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { enrolledCourses: courseId } },
        { new: true }
      );
      res.json({ message: 'Successfully unenrolled from the course.', user });
    } catch (error) {
      console.log('Error unenrolling user:', error);
      res.status(500).json({ message: 'Failed to unenroll from the course.' });
    }
  };

module.exports = {
    register,
    login,
    getAllUsers,
    getUser,
    updateUserProfile,
    changePassword,
    deleteUserProfile,
    enrollCourse,
    unenrollCourse,
  };