const Mongoose = require("mongoose")

// mongodb address, create database boba_db or {name_db} first
const db = `mongodb://127.0.0.1:27017/boba_db`

exports.connectDb = async () => {
    await Mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("db connected")
}

exports.closeDb = async() => {
  Mongoose.connection.close();
  console.log("db closed")
}
