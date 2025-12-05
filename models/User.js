const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        trim: true,
        match: [/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, apostrophes, and hyphens']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address'
        },
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: { 
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'] 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshToken: {
        type: String,
        default: null
    }
}, 
    { timestamps: true }
);

//Unique index on email
userSchema.index({ email: 1 }, { unique: true });

// Pre-save hook to hash password if modified
userSchema.pre('save', async function(next) {
    if (!this.isModified('passwordHash')) return next();
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();  
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);