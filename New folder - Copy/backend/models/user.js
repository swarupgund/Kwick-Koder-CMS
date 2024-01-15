const mongoose = require('mongoose');
const {Schema, model } = mongoose;

const UserSchema = new Schema({
    name : String,
    mail : {type : String , required: true , unique : true} ,
    mobile : Number,
    password : String,
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

const UserModel = model('User' , UserSchema);

module.exports = UserModel;