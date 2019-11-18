const jwt = require("jsonwebtoken");

//const secret = "shhhhhh!!!! keep it secret!s";
const secret = process.env.SECRET;

module.exports = {
  restricted,
  validateNewUser
};

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: err.message });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

function validateNewUser(req, res, next) {
  const newUserToBeRegistered = req.body;
  if (!newUserToBeRegistered) {
    res
      .status(400)
      .json({ message: `All new users must have required fields` });
  } else if (!newUserToBeRegistered.username) {
    res.status(400).json({ message: `User must have a username field` });
  } else if (!newUserToBeRegistered.password) {
    res.status(400).json({ message: "User must have a password field" });
  } 
  else if (!newUserToBeRegistered.department) {
    res.status(400).json({ message: "User must have a department field" });
  }else {
    req.user = newUserToBeRegistered;
    next();
  }
}
