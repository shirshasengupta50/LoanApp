const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const dbConnect = require("./config/dbConfig");
const cors = require('cors');

const apiRoute = require('./routes/userRoutes');

const app = express();
dotenv.config();

const PORT = process.env.PORT;

const setupAndStartServer = async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());

    app.use('/api', apiRoute);

    app.listen(PORT, async()=>{
        console.log(`Server Running on PORT at ${PORT}`);
        dbConnect();
    });
}

setupAndStartServer();