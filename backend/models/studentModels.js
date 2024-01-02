const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    
    studentEnrollment: {
        type: String,
        required: [true, "Please add the Enrollment No"],
    },
    studentName: {
        type: String,
        required: [true, "Please add the Name"],
    },
    studentClass: {
        type: String,
        required: [true, "Please add the Class"],
    },
    studentBatch: {
        type: String,
        required: [true, "Please add the Board"],
    },
    studentCourse: {
        type: String,
        required: [true, "Please add the Course"],
    },
    studentPassword: {
        type: String,
        required: [true, "Please add the password"],
    },
    studentPhoto: {
        type: String,
    },
    studentSubjects: {
        type: [],
        required: [true, "Please add the Subjects"],
    },
    
    admissionAmount: {
        type: Number,
    },
    studentPhone: {
        type: String,
        required: [true, "Please add the Phone no"],
    },
    studentAddress: {
        type: String,
        required: [true, "Please add the Address"],
    },
    studentPaymentType: {
        type: String,
        required: [true, "Please add the Payment type"],
    },
    studentFee:{
        type: Number,
        required: [true, "Please add the Payment "],
    },
    studentBlood: {
        type: String,
        required: [true, "Please add the blood group"],
    },
    studentCategory: {
        type: String,
        required: [true, "Please add the category"],
    },
    guardianName: {
        type: String,
        required: [true, "Please add the Guardian Name"],
    },
    
    
    createdMonth: {
        type:Number,
        required: [true, "Please add the Month"],
    },
    createdYear : {
        type:Number,
        required: [true, "Please add the Year"],
    }
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("student" , studentSchema)