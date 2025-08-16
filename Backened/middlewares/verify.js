import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user.role !== 1) {
    return res.status(403).json({ success: false, message: "This route is reserved for Admin" });
  }
  next();
};

export const isUser = (req, res, next) => {
  if (req.user.role !== 0) {
    return res.status(403).json({ success: false, message: "This route is reserved for Students" });
  }
  next();
};
