//obj destructuring used to extrapolate Datatypes object from 
//seqlize connection 

const { DataTypes } = require('sequelize');

//import connection to our db from the db.js file 
const db = require('../db');


// create and define model using .define method
//this will become a table called users in postgres db eleven-journal
const Journal = db.define('journal', {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Journal;