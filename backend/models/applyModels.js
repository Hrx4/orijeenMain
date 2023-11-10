const mongoose = require('mongoose')

const applySchema = mongoose.Schema({
    
    applyName: {
        type: String,
        required: [true, "Please add the name"],
    },
    applyEmail: {
        type: String,
    },
    applyPhone: {
        type: Number,
        required: [true, "Please add the phonenumber"],
    },
    applyClass: {
        type: String,
        required: [true, "Please add the class"],
    },
    applyCourse: {
        type: String,
        required: [true, "Please add the course"],
    },
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("apply" , applySchema)