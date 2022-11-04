"use strict";

/** Database for lunchly */

const { Client } = require("pg");

//Jen's DB
const DB_URI = process.env.NODE_ENV === "test"
    ? "postgresql:///lunchly_test"
    : "postgresql:///lunchly";

//Michael's DB
// const DB_URI = process.env.NODE_ENV === "test"
// ? "postgresql://mtbocim:tacocat@localhost/lunchly_test"
// : "postgresql://mtbocim:tacocat@localhost/lunchly";


let db = new Client({
  connectionString: DB_URI,
});

db.connect();


module.exports = db;
