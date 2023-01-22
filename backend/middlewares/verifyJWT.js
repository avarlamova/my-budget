const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization; //|| req.headers.Authorization;
  //   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    // req.user = decoded.UserInfo.username;
    // req.roles = decoded.UserInfo.roles;
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;

const arr = [0, 1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  console.log(i);
}

//0
//1
//2
//3
//4
//5
