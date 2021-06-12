//import sql pckg 
//&create new instance of sql object

const Sequelize = require('sequelize');

//use constructor to create new sql object 
//arg is the connection to the db 
//postgres://user:password@localhost:1000/dbname
const sequelize = new Sequelize('postgres://postgre:postgre@localhost:5432/eleven-journal');


module.exports = sequelize;