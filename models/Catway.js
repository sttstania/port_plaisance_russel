const mongoose = require('mongoose');
const e = require('cors');


const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Catwway number is required'],
        unique: true,
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: ['short', 'long'],
    },
    catwayState: {
        type: String,
        required: [true, 'Catway state is required'],  
    },
}, 
    { timestamps: true }
);



module.exports = mongoose.model('Catway', catwaySchema);
