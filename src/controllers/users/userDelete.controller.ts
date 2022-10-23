import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userDeleteService from "../../services/user/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idReq = id;

    const user = await userDeleteService(idReq);

    if (typeof user === "string") {
      return res.status(204).json({ user });
    } else {
      return res.status(user[1] as number).json({ message: user[0] });
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default userDeleteController;
