const jwt = require("jsonwebtoken");

// check and pass tokens
module.exports = async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedTk = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedTk;

    req.user = user;
    res.status(201).json({
      message: user.username,
    })
    
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
