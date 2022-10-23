import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userUpdateService from "../../services/user/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const isAdm = req.isAdm!;
    const useRquesID = req.userId!;

    const { name, email, password } = req.body;
    const idWillUpdate = req.params.id;

    if (Object.keys(req.body).includes("isAdm")) {
      return res
        .status(401)
        .json({ message: "don't try to update isAdm field!" });
    }
    if (Object.keys(req.body).includes("isActive")) {
      return res.status(401).json({
        message: "don't try to update isActive field!",
      });
    }

    if (Object.keys(req.body).includes("id")) {
      return res.status(401).json({
        message: "don't try to update id field!",
      });
    }
    const user = await userUpdateService(
      isAdm,
      useRquesID,
      name,
      email,
      password,
      idWillUpdate
    );

    return res.status(200).json({ message: "User updated!" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userUpdateController;
