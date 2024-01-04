const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    
    teacherName: {
        type : String
    },
    teacherAge : {
        type: String
    },
    teacherGender: {
        type : String
    },
    teacherEducation : {
        type: String
    },
    teacherAddress: {
        type : String
    },
    teacherSalary : {
        type: Number
    },
    teacherDoj: {
        type : String
    },
    teacherSubject : {
        type: String
    },
    teacherClass: {
        type : String
    },
    teacherCourse : {
        type: String
    },
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("teacher" , teacherSchema)