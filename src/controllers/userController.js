const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Loan = require('../models/loanApplicationSchema');
const admin = require('../config/firebaseConfig');
const calculateMaxLoan = require('../utils/loanEligibility');

dotenv.config();

const secretKey = process.env.secretKey;

const userRegistration = async(req, res)=>{
    try {

        const data = req.body;

        const response = await User.create(data);

        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "User Successfully Registered"
        });

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Register User"
        });
    }
}


const loanApplicationSubmission = async(req, res)=>{
    try {
        const data = req.body;
        
        const response = await Loan.create(data);

        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Loan Application Created"
        });

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Loan Application not created"
        });
    }
}

const loanStatusTracking = async(req, res)=>{
    try {
        const userID = req.body.userID;
        
        const response = await Loan.findOne({userID});

        if(!response){
            throw error;
        }

        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Loan Application Created"
        });

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Loan Application not created"
        });
    }
}

const logIn = async(req, res)=>{
    try {
        
        const { mobileNumber } = req.body;

        const user = await User.findOne({mobileNumber});

        if(!user){
            throw error;
        }

        const customToken = await admin.auth().createCustomToken(mobileNumber);

        return res.status(201).json({
            data: customToken,
            error:{},
            success: true,
            message: "Loan Application Created"
        });

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Loan Application not created"
        });
    }
}

const verifyOTP = async(req, res)=>{
    try {
        
        const { mobileNumber, idToken } = req.body;

        const decodedToken = await admin.auth().verifyIdToken(idToken);

        const user = await User.findOne({mobileNumber});

        const token = jwt.sign(user, secretKey, {expiresIn: '365d'});

        const response = {
            uid: decodedToken.uid,
            user: user,
            token: token
        }

        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Loan Application Created"
        });

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Loan Application not created"
        });
    }
}

const verifyToken = async(req, res)=>{
    try {
        const token = req.token;
        
        const user = jwt.verify(token, secretKey);

        return res.status(201).json({
            data: user,
            error:{},
            success: true,
            message: "Loan Application Created"
        });

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Loan Application not created"
        });
    }
}

const loanEligibility = async(req, res)=>{
    try {
        const data = req.body;

        const maxAmount = calculateMaxLoan(data.monthlyIncome, data.tenure, data.interest);

        return res.status(201).json({
            data: maxAmount,
            error:{},
            success: true,
            message: "Loan Application Created"
        });

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Loan Application not created"
        });
    }
}

const getUser = async(req, res)=>{
    try {
        const { mobileNumber } = req.body;

        const response = await User.findOne({ mobileNumber });

        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Loan Application Created"
        });

    } catch (error) {
        console.log("Error in User Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Loan Application not created"
        });
    }
}

module.exports = {
    userRegistration,
    loanApplicationSubmission,
    loanStatusTracking,
    logIn,
    verifyOTP,
    verifyToken,
    loanEligibility,
    getUser
}