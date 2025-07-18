import path from "path";
import { promises } from "fs";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import usersJson from "../data/users.json" with { type: 'json' };

const __dirname = import.meta.dirname;

// json file to act as a mock database
var db = usersJson

const registerUser = async (req, res) => {

  const errors = validationResult(req);
  // make sure there is both a username and password sent
  // todo: better input validation for the username and password
  if (!errors.isEmpty())
    return res
  .status(400)
  .json({ message: "Username and password are required" });

  const { user, pwd } = req.body;

  // check for duplicates
  const duplicate = db.find((account) => account.username === user);
  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // new user json object created with a user role and empty profile info
    const newUser = { username: user, password: hashedPwd, role: "user", profile: [] };

    // store the user in the mock db
    // note: the users.json file should at least have an empty array []
    db = [...db, newUser];

    await promises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(db)
    );

    console.log(db.users);
    res.status(201).json({ success: `new user ${user} created` });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default registerUser;