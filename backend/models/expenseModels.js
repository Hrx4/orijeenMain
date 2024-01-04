const mongoose = require('mongoose')

const expense = mongoose.Schema({
    
    expenseTitle: {
        type : String
    },
    expenseDescription: {
        type : String
    },
    expenseAmount: {
        type : Number
    },
    expenseDate: {
        type : String
    },
    
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("expense" , expense)