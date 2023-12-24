const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    
    subjectList: {
        type: String
    },  
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("subject" , subjectSchema)