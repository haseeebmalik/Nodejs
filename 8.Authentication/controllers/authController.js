const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "username and password are not correct." });
  }
  const founduser = usersDB.users.find((person) => person.name === user);

  if (!founduser) {
    return res.sendStatus(401); //Unauthorized
  }

  // evaluate password
  const match = await bcrypt.compare(pwd, founduser.password);
  if (match) {
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.sendStatus(401); //Unauthorized
  }
};

module.exports = { handleLogin };
