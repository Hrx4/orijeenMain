const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    
    className: {
        type: String
    },  
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("class" , classSchema)