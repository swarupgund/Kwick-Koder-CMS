const mongoose = require('mongoose');
const {Schema, model } = mongoose;

const CourseSchema = new Schema({
    title : {type : String , required: true , unique : true} ,
    cover : {type:String},
    overview : {type:String},
    outcome: { type: String },
    content: {type:String},
    quiz: {type:String},
    requirements: { type: String },
    difficulty: { type: String, required: true },
    fees: { type: Number, required: true }
},{
    timestamps:true,
});

const CourseModel = model('Course' , CourseSchema);

module.exports = CourseModel;