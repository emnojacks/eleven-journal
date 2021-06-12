//obj destructuring used to extrapolate Datatypes object from 
//seqlize connection 

const { DataTypes } = require('sequelize');

//import connection to our db from the db.js file 
const db = require('../db');


// create and define model using .define method
//this will become a table called users in postgres db eleven-journal
const User = db.define('user', {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;