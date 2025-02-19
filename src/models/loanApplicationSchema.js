const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    loanPurpose: {
        type: String,
    },
    principalAmount: {
        type: Number,
        required: true
    },
    tenure: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Disbursed'],
          },
        default: 'Submitted'
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;