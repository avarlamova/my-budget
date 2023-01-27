const User = require("../model/User");

const handleLogout = async (req, res) => {
  // TODO On client, also delete the accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    console.log("15");
    return res.sendStatus(204); //success, no content
  }

  // delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  console.log("received rt", refreshToken);
  console.log("all rt", foundUser.refreshToken);
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // 'secure' - only https allowed
  res.sendStatus(204);
};

module.exports = { handleLogout };
