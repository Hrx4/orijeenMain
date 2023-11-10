const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    
    contactName: {
        type: String,
        required: [true, "Please add the name"],
    },
    contactEmail: {
        type: String,
        required: [true, "Please add the email"],
    },
    contactPhone: {
        type: Number,
        required: [true, "Please add the phonenumber"],
    },
    contactMessage: {
        type: String,
        required: [true, "Please add the message"],
    },
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("contact" , contactSchema)