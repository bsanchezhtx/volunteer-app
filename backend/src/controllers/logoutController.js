import path from "path";
import { promises } from "fs";
import usersJson from "../data/users.json" with { type: 'json' };

const __dirname = import.meta.dirname;

// json file to act as a mock database
var db = usersJson

const logout = async (req, res) => {
  // ensure access token is deleted on client side
  // refresh token will be deleted here


  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  // find the refresh token in the db
  const foundUser = db.find((account) => account.refreshToken === refreshToken);
  // if it's not there, clear the cookie
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true });
    return res.sendStatus(204);
  }
  
  // delete token if found
  const others = db.filter(account => account.refreshToken !== foundUser.refreshToken);
  const current = {...foundUser, refreshToken: ''}

  // case where there's only one user in the mock db
  if (Object.keys(others).length == 0) {
    db = current;
  }
  else {
    db = [...others, current];
  }

  await promises.writeFile(
    path.join(__dirname, '..', 'data', 'users.json'),
    JSON.stringify(db)
  )

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
  res.sendStatus(204);
};

export default logout;