const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const e = require('cors');
const { boolean } = require('joi');

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
        type: string,
        required: [true, 'Catway state is required'],  
    },
}, 
    { timestamps: true }
);

//Unique index on catwayNumber
catwaySchema.index({ catwayNumber: 1 }, { unique: true, background: true });

module.exports = mongoose.model('Catway', catwaySchema);
