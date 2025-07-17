import whitelist from "../config/whitelist.js";

const allowCredentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default allowCredentials;
