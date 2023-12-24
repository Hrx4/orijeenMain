const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    
    subjectName: {
        type: String
    },  
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("subject" , subjectSchema)