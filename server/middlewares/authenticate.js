const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[0];
  console.log(token)

  if (!token) {
    return res.status(401).send({
        status: "fail",
        message: "Unauthorized!"
      });; // 
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        return res.status(403).send({
            status: "fail",
            message: "Forbidden!",
          }); 
    }
    req.user = user; 
    console.log("is",user)// Attach the user object to the request
    next();
  });
}

module.exports = authenticateJWT;
