const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  //decode jwt
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
    });
  }

  try {
    const data = jwt.verify(token, "SECRET_KEY");
    req.user = data.user;
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
    });
  }
};

module.exports = fetchUser;