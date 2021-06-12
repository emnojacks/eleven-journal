//package imports
const router = require('express').Router();
const { UserModel } = require('../models');
//const { UniqueConstraintError } = require('sequelize/types');
const { UniqueConstraintError } = require('sequelize/lib/errors');
/*
^^combined two lines of code. We import the Express framework and access the Router()  method, assigning it to a variable called router. Recall that we are setting this variable as a const because we don't want to be able to change the value of this variable
 We use object deconstructing to import the user model and store it in UserModel variable. 
*/
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
    //user router var to access Router methods 
    //this is an example of a user posting to the db 
router.post('/register', async(req, res) => {
    /* We use the UserModel variable we
     created on line 2 to access the model 
     that we created a few lessons back 
     (model folder > users.js). This will 
     grant us access to the UserModel model 
     properties and to Sequelize methods.
     */

    /*
     using object deconstruction to take in and parse the request. We use the req.body middleware provided by Express and append two properties or key-value pairs to it. This is what we're sending to the database. req is the actual request, and body is where our data is 
     being held. user is a property of body, while email and password are properties of user.
     */
    let { email, password } = req.body.user;
    //await captures the promise that is returned by our query to DB
    //we don't want to store in a variable bc this data may change 
    try {
        const User = await UserModel.create({
            email,
            //password encryption 
            //hashsync method has two params - first is the string we want to hash, 
            //second param is # of times we want pass salted
            password: bcrypt.hashSync(password, 13),
        });

        let token =
            //sign method creates the token and takes params payload and signature
            //user.id is the id of the user in the user model/table in the DB
            //second param is the signature which is apassword to encode and decode token
            //third param is expiration in seconds, mins, hrs 
            jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }) //res.send("this is our user/registration endpoint");
            //the .status method allows us to add a status code to our response
            //.json packages response as a json object
            //201 status code indicates something was successfully created 
            //200 just means general success

        res.status(201).json({
            //always good practices to add an add'ln msg 
            message: "user successfully registered",
            user: User,
            //adding token to the body of the response
            sesionToken: token,
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "failed to register user",
            });
        }
    }
});

//this is to login with a user that's already existing
//creates a log in channel / route via the post method of the reouter 
//object 
router.post("/login", async(req, res) => {
    let { email, password } = req.body.user;
    try {
        //we await the data response and store it in an object called loginuser
        const loginUser = await UserModel.findOne({
            //we filter what to look for with a where clause 
            where: {
                email: email,
            }
        });
        //this if statement checks whether the loginUser object is true or false
        //if the object is null it is falsy and therefore the catch block is triggered
        if (loginUser) {
            res.status(200).json({
                //always good practices to add an add'ln msg 
                //this body key value pair must match the const object you are creating in the 
                //await async func above
                user: loginUser,
                message: "User successfully logged in",
                sessionToken: token,

            });
            let token =
                jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }) //res.send("this is our user/registration endpoint");


        } else {
            res.status(401).json({
                message: "Login attempt failed"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Cannot log in user",
        });
    }
});

module.exports = router;