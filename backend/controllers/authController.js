const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  // TODO check multilogin on frontend
  const { user, pwd } = req.body;

  console.log(user, pwd);
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15s" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken // data already in db
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt); // remove received token from db

    if (cookies?.jwt) {
      /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    // save refreshToken for current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      // secure: true, // TODO uncomment
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send authorization roles and access token to user
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
