const User = require("../model/user");
const bcrypt = require("bcryptjs");
const {connectDb, closeDb }= require("../server");
const jwt = require("jsonwebtoken");

// register fucntion
exports.register = async (req, res, next) => {
  const { username, password } = req.body

  if (!username) {
    res.status(400).json({
      message: "no username",
    })
  }else if(!password) {
    res.status(400).json({
      message: "no password",
    })
  }else{
    try{
      const user = await User.findOne({ username })
      if(user) {
        res.status(401).json({
          message: "register failed",
          error: "username found",
        })
      }else {
        try {
          bcrypt.hash(password, 10).then(async (hash) => {
            await User.create({
              username,
              password: hash,
            }).then(user =>
              res.status(200).json({
                message: "account successfully created",
                user,
              })
            )
            closeDb();
          })
        } catch (err) {
          res.status(401).json({
            message: "register failed",
            error: err.mesage,
          })
        }
        
      }
      
    }catch (err) {
      res.status(401).json({
        message: "user find failed",
        error: err.mesage,
      })
    }
    
  }
  
}

// login function
exports.login = async (req, res, next) => {
  // connectDb();
  const { username, password } = req.body
  // db connect
  if (!username) {
    res.status(400).json({
      message: "no username",
    })
  }else if(!password) {
    res.status(400).json({
      message: "no password",
    })
  }else {
    try {
      const user = await User.findOne({ username })
      
      if (!user) {
        res.status(401).json({
          message: "login failed",
          error: "user not found",
        })
      }else {
        bcrypt.compare(password, user.password).then(function (check) {
          if(check) {
            const token = jwt.sign(
              { username: user.username,},
              "RANDOM-TOKEN",
              { expiresIn: "5h" }
              )
            res.status(201).json({
              message: "login successful",
              token,
            })
          }else{
            res.status(400).json({
              message: "login failed",
              error: "wrong password",
            })
          }
        })
      }
  
    }catch (err) {
      res.status(401).json({
        message: "login failed",
        error: err.mesage,
      })
    }
  }  
}





// update password function
exports.update = async (req, res, next) => {
  const { username, password, newPassword } = req.body
  
  try{
    const user = await User.findOne({ username })
    
    if (!user) {
      res.status(401).json({
        message: "update failed",
        error: "user not found",
      })
    }else {
      bcrypt.compare(password, user.password).then(function (check) {
        if(check) {
          bcrypt.hash(newPassword, 10).then(async (hash) =>{
            user.password = hash;
  
            await user.save();
            res.status(200).json({
              message: "update successful",
            })
          })

        }else {
          res.status(401).json({
            message: "update failed",
            error: "wrong password",
          })
        }
      })
    }
    
  }catch (err) {
    res.status(401).json({
      message: "update request failed!",
      error: err.mesage,
    })
  }
}

// delete user function
exports.deleteUser = async (req, res, next) => {
  const { username } = req.body
  await User.findOne({username})
  .then(user => user.remove())
  .then(user =>
    res.status(201).json({ message: "account successfully deleted" })
    // res.redirect('/profile')
  )
  .catch(err =>
    res.status(400).json({ message: "account delete failed", error: err.message })
  )
}

// logout user function
exports.logout = async (req, res, next) => {
  // close DB.
  res.status(200).json({ message: "logged out" })
  closeDb();

}

// reconnect function
exports.reconnect = async (req, res, next) => {
  connectDb();
}
