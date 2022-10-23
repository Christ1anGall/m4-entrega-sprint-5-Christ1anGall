import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoryListService from "../../services/categories/categoriesList.service";

const categoryListController = async (req: Request, res: Response) => {
  try {
    const category = await categoryListService();

    return res.status(200).json(category);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default categoryListController;
