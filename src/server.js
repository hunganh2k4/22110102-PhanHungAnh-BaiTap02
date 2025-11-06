import express from "express"; 
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"; 
import initWebRoutes from './route/web'; 
import connectDB from './config/configdb.js';
require('dotenv').config(); 

let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969; //tao tham s6 port l$y t0 .env
//Port === undefined => port = 6969
//chay server
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
});