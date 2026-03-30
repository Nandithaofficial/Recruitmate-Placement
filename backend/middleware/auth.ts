// backend/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Shape of your JWT payload
interface JwtPayload {
  id: string;
  email?: string; // add other fields if your token has them
}

// Extend Express Request to include `user`
export interface CustomRequest extends Request {
  user?: JwtPayload;
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT and cast decoded value to JwtPayload
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "YOUR_SECRET_KEY") as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;