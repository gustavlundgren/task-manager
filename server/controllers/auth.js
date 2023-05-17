const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const usersDB = {
  data: require("../models/users.json"),
  setUsers: function (data) {
    this.data = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const register = async (req, res) => {
  const { userName, email, password, picturePath } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = {
      id: uniqid(),
      userName,
      email,
      passwordHash,
      picturePath,
    };

    usersDB.setUsers([...usersDB.data, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.data)
    );

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = usersDB.data.find((u) => u.email === email);

    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(403).json({ message: "Invalid credetials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    user.password = undefined;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
