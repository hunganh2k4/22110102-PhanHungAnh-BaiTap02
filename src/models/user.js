// src > models > user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: String,
    phoneNumber: String,
    gender: Boolean,
    image: String,
    roleId: String,
    positionId: String
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;