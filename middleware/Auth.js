const jwt = require("jsonwebtoken");

const AuthenticatedUser = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res
        .staus(401)
        .json({ error: "You're not authorized to access this page" });
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.staus(401).json({ error: "Unauthorized, Token Not Provided" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.staus(401).json({ error: "Unauthorized" });
    console.error(error);
  }
};

module.exports = AuthenticatedUser;
