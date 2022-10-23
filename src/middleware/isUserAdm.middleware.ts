import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAdmUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    jwt.verify(
      String(token),
      String(process.env.SECRET_KEY),
      (err: any, decoded: any) => {
        if (!decoded) {
          return res.status(401).json({ message: "Token Invalid" });
        }

        if (!decoded.isAdm) {
          return res
            .status(403)
            .json({ message: "user not has Authorization " });
        }

        req.isAdm = decoded.isAdm;

        next();
      }
    );
  } catch (error) {
    return res.status(403).json({ message: "Token Invalid" });
  }
};
