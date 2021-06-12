/*We define a property called journalController. 
The value of this property is the import of the journalcontroller file.
we are exporting as an object*/
module.exports = {
    userController: require('./userController'),
    journalController: require('./journalcontroller'),
};