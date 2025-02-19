const express = require('express');

const userController = require('../controllers/userController');
const tokenAuthentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/register', userController.userRegistration);
router.post('/login', userController.logIn);
router.post('/verifyOTP', userController.verifyOTP);
router.post('/verifyToken', tokenAuthentication, userController.verifyToken);
router.post('/loanApplicationSubmit', userController.loanApplicationSubmission);
router.post('loanEligibility', userController.loanEligibility);
router.get('/loanStatus', userController.loanStatusTracking);

module.exports = router;