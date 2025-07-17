import jwt from "jsonwebtoken";
import "dotenv/config"
import usersJson from "../data/users.json" with { type: 'json' };

const __dirname = import.meta.dirname;

// json file to act as a mock database
var db = usersJson

const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  // find the user
  const foundUser = db.find((account) => account.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403);

  // evaluate the jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {"username": decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ accessToken })
    }
  )
};

export default refreshTokenHandler;