const tokenAuthentication = (req, res)=>{
    const token = req.headers['authorization'];

    if(token){
        req.token = token;
        next();
    }

    res.status(500).json({
        data: {},
            error: error,
            success: false,
            message: "Loan Application not created"
    });
}

module.exports = tokenAuthentication;