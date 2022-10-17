import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return new Error("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(new Error("You are not authorized!"));
    }
  });
};
