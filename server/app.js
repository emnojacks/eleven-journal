//this is the entryway into the app 
//contains BASEURL Creation
require("dotenv").config();
const Express = require("express");
const app = Express();
//create db var that imports db file 
const dbConnection = require('./db');

//import controllers that we just exported into index.js and store in var 
const controllers = require("./controllers");


// app.use('/test', (req, res) => {
//     res.send('this is a msg from the test endpoint on the server');
// });


//create a base url called /journal 
//base url will look like: http://localhost:3000journal
//second param we pass in controllers and use dot notations to access journalController

//add middleware func 
//this must go above any route statements  bc all res must be jsonifiied 
app.use(Express.json());

app.use("/user", controllers.userController);

//app.use(require("./middleware/validate-jwt"));
app.use("/journal", controllers.journalController);


//authenticate the user using an async method returns a promise 
dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });