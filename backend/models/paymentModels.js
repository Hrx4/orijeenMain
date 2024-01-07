const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    
    paymentId: {
        type: String,
        required: [true, "Please add the Title"],
    },
    studentCourse: {
        type: [],
        required: [true, "Please add the Course"],
    },
    studentName: {
        type: String,
        required: [true, "Please add the name"],
    },
    studentSubjects: {
        type: [],
        required: [true, "Please add the Subjects"],
    },  
    studentClass: {
        type: String,
        required: [true, "Please add the Course"],
    },
    paymentMoney: {type:Number },
    paymentType: {type:String },
    totalIncome : {type:Number},
    lastIncomeMonth: {type:Number},
    lastIncomeMoney: {type:Number},
    lastIncomeDate: {type:String},


    paymentDetails: {
        type: [
            new mongoose.Schema({
                paymentMonth : {type:String },
                paymentMoney:{type:Number},
                paymentYear:{type:String},
                paidMonth : {type:String },
                paidYear:{type:String},
                paymentType:{type:String},
                paymentDate: {type:String }
            })
        ],

    }
    
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("payment" , paymentSchema)