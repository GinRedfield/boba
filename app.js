const express = require("express")
const app = express()
const PORT = 5000
const { connectDb, closeDb } = require("./server");

// config
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

// startup
app.listen(PORT, () => 
    console.log(`connected to port ${PORT}`)
);

// middleware
app.use(express.json())
app.use("/api/auth", require('./routes/middleware'))

// insert data, please comment out after npm run
// please use create account with user name test to view the collections
// const { insertSpendings, insertTracks } = require("./populate_db");
// connectDb().then(insertSpendings);
// connectDb().then(insertTracks);