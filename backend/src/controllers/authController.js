import "dotenv/config"
import path from "path";
import { promises } from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import usersJson from "../data/users.json" with { type: 'json' };

const __dirname = import.meta.dirname;

// json file to act as a mock database
var db = usersJson

const userLogin = async (req, res) => {
  const { user, pwd } = req.body;

  // make sure there is both a username and password sent
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  // find the user
  const foundUser = db.find((account) => account.username === user);
  if (!foundUser) return res.sendStatus(401);

  // evaluate the encrypted password with the password sent in request
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // creating a jwt
    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' },
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    );

    const others = db.filter(account => account.username !== foundUser.username);
    const current = {...foundUser, refreshToken };
    db = [others, current];

    await promises.writeFile(
      path.join(__dirname, '..', 'data', 'users.json'),
      JSON.stringify(db)
    )
    // make sure this token is stored in local memory on the front end
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
  }
  else {
    res.sendStatus(401);
  }
};

export default userLogin;