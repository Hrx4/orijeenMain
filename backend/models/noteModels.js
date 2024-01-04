const mongoose = require('mongoose')

const note = mongoose.Schema({
    
    noteTitle: {
        type : String
    },
    noteSubject: {
        type : String
    },
    noteClass: {
        type : String
    },
    noteBatch: {
        type : String
    },
    notePdf: {
        type : String
    },
    noteCourse: {
        type : String
    },
    
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("note" , note)