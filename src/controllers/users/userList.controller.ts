import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userListService from "../../services/user/userList.service";

const userListController = async (req: Request, res: Response) => {
  try {
    const users = await userListService();

    return res.status(201).json(users);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default userListController;
