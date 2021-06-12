//This file creates ROUTES to the API and server



//importing express library framework and storing it in var 
//this allows us to access all methods of Express 
const Express = require('express');
/*Since the Express variable gives us access into the express framework,
we can access express properties and methods by calling express.methodName().
Therefore, when we call Express.Router(), we are using the Express
variable to access the  Router() method. 
 */
const router = Express.Router();
//router method returns a router object 
//we use a router var to get access to router methods 

//this is a get request and it's passed two args 
// the first arg is the file path 
//second arg is anon callback func / handler func 
//app listens for requests that match the route and methods 
//detects a match and call sthe callback func 

router.get('/practice', (req, res) => {
    res.send("Hey, this is a practice route");
    //res = response and .send is a method that packages up the response which in this case is just a string
});
router.get('/about', (req, res) => {
    res.send("This is the about route");
    //res = response and .send is a method that packages up the response which in this case is just a string
});

//we export module for access and use outside of this file 
module.exports = router;