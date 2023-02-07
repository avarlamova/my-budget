const bcrypt = require("bcrypt");
const User = require("../model/User");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }) //built-in mg function
    .exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10); // ten salt rounds;

    await User.create({
      // built-in mongoose function
      username: user,
      password: hashedPwd,
    });

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
