const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    
    courseName: {
        type: String
    },  
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("course" , courseSchema)