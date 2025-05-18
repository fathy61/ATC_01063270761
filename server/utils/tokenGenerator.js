const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: false, //process.env.NODE_ENV === "production"
    sameSite: 'strict',  // or 'lax'
    maxAge: 48 * 60 * 60 * 1000, // match token expiration if possible (2 days)
  };
  
  return { token, cookieOptions };
};


exports.generateForgetPasswordToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_FORGET_KEY, {
    expiresIn: "10m",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',  // or 'lax'
    maxAge: 10 * 60 * 1000, // match token expiration if possible (2 days)
  };
  
  return { token, cookieOptions };
};
