import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "no token",
      });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken.existingUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
export default authMiddleware;
