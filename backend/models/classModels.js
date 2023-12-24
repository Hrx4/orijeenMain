const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    
    classList: {
        type: String
    },  
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("class" , classSchema)