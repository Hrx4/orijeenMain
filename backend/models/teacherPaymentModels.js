const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    
    paymentId: {
        type: String,
        required: [true, "Please add the Title"],
    },
    teacherCourse: {
        type: String,
        required: [true, "Please add the Course"],
    },
    teacherName: {
        type: String,
        required: [true, "Please add the name"],
    },
    teacherSubject: {
        type: String,
        required: [true, "Please add the Subjects"],
    },  
    teacherClass: {
        type: String,
        required: [true, "Please add the Course"],
    },
    paymentMoney: {type:Number },
    totalExpense : {type:Number},
    lastExpenseMonth: {type:Number},
    lastExpenseDate: {type:String},


    paymentDetails: {
        type: [
            new mongoose.Schema({
                paymentMonth : {type:String },
                paymentMoney:{type:Number},
                paymentYear:{type:String},
                paidMonth : {type:String },
                paidYear:{type:String},
                paymentDate: {type:String }
            })
        ],

    }
    
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("teacherPayment" , paymentSchema)