const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    dob : {
        type: Date,
        require: true
    },
    gender : {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Others'],
            message: '{VALUE} is not supported'
          }
    },
    emailID : {
        type: String,
        unique: true
    },
    panID: {
        type: String,
        unique: true
    },
    mobileNumber: {
        type: Number,
        require: true
    },
    maritalStatus: {
        type: String,
        enum: {
            values: ['Married', 'Unmarried'],
            message: '{VALUE} is not supported'
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;