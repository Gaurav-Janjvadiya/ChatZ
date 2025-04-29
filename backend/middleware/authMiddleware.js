import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const username = jwt.verify(token, process.env.SECRET);
  if (username) {
    req.name = username.name;
    next();
  } else {
    throw new Error("User Not Logged in");
    res.status(401).json({ message: "Not Authorized" });
  }
};

export default authMiddleware;
