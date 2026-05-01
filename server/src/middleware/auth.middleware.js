import jwt from "jsonwebtoken";

/**
 * Verify JWT token
 */

export const protect = (req, res, next) => {
  let token;

  // token expected in header: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request
    
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}; 
 
/**
 * Creator-only guard
 */
export const creatorOnly = (req, res, next) => {
  if (req.user.role !== "creator") {
    return res
      .status(403)
      .json({ message: "Access denied. Creator only." });
  }
  next();
};
