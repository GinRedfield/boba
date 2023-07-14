const Mongoose = require("mongoose")

const UserSchema = new Mongoose.Schema({
  username: { 
    type: String, 
    unique: true, 
    required: true
},
  password: {
    type: String,
    required: true
},
role: {
  type: String,
  default: "Regular",
  required: true,
},
})

const User = Mongoose.model("user", UserSchema)
module.exports = User