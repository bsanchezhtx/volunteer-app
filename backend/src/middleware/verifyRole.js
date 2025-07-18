//middleware function to check for role of a user in request
const verifyRole = (allowed) => {
  return (res, req, next) => {
    if (!req?.role) return res.sendStatus(401);
    if (req.role === allowed) {
      next();
    } else {
      res.sendStatus(401);
    }
  };
};

export default verifyRole;
