import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoriesCreateService from "../../services/categories/categoriesCreate.service";

const categoriesCreateController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await categoriesCreateService({ name });

    return res.status(201).json(newCategory);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default categoriesCreateController;
