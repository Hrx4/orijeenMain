const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    
    courseList: {
        type: String
    },  
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("course" , courseSchema)