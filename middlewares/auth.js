const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token);
  if (token?.startsWith("Bearer ")) token = token.slice(7);
  if (!token) return res.status(403).json({ message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Failed to authenticate token." });

    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticate;
