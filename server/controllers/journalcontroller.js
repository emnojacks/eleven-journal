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
const validateJWT = require("../middleware/validate-jwt");
//import journal model
const { JournalModel } = require("../models")


router.get('/practice', validateJWT, (req, res) => {
    res.send("Hey, this is a practice route");
    //res = response and .send is a method that packages up the response which in this case is just a string
});

/*
JOURNAL CREATE
 */
router.post("/create", validateJWT, async(req, res) => {
    const { title, date, entry } = req.body.journal;
    const { id } = req.user;
    const journalEntry = {
        title,
        date,
        entry,
        owner: id
    }
    try {
        const newJournal = await JournalModel.create(journalEntry);
        res.status(200).json(newJournal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
//-- -- -- -- -- -- -- --
//GET ALL JOURNALS
//-- -- -- -- -- -- -- -- --

router.get("/", async(req, res) => {
    try {
        const entries = await JournalModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//-- -- -- -- -- -- -- --
//GET JOURNAL ENTRIES BY USER 
//-- -- -- -- -- -- -- -- --

router.get("/mine", validateJWT, async(req, res) => {
    const { id } = req.user;
    try {
        const userJournals = await JournalModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userJournals);
    } catch (err) {
        res.status(500).json({ error: err });
    };
});

//-- -- -- -- -- -- -- --
//GET JOURNAL ENTRIES BY TITLE 
//-- -- -- -- -- -- -- -- --
router.get("/:title", async(req, res) => {
    const { title } = req.params;
    try {
        const results = await JournalModel.findAll({
            where: {
                title: title
            }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    };
});


//-- -- -- -- -- -- -- --
//UPDATE JOURNAL ENTRIES  
//-- -- -- -- -- -- -- -- --

router.put("/update/:entryId", validateJWT, async(req, res) => {
    const { title, date, entry } = req.body.journal;
    const journalId = req.params.entryId;
    const userId = req.user.id;
    //makes it easier for user to find the journal they want to update
    const query = {
        where: {
            id: journalId,
            owner: userId
        }
    };
    //create new entry
    const updatedJournal = {
        title: title,
        date: date,
        entry: entry
    };
    try {
        //update is sequelize method that takes two args - first is object holding the new value, and second is where to place new data
        const update = await JournalModel.update(updatedJournal, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//-- -- -- -- -- -- -- --
//DELETE JOURNAL ENTRIES  
//-- -- -- -- -- -- -- -- --
// when you append the :id you can pass a param to the url
router.delete("/delete/:id", validateJWT, async(req, res) => {
    const ownerId = req.user.id;
    const journalId = req.params.id;

    try {
        const query = {
            where: {
                id: journalId,
                owner: ownerId
            }
        };

        await JournalModel.destroy(query);
        res.status(200).json({ message: "Journal entry deleted" });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});


router.get('/about', (req, res) => {
    res.send("This is the about route");
    //res = response and .send is a method that packages up the response which in this case is just a string
});

//we export module for access and use outside of this file 
module.exports = router;