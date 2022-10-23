import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoryListServiceOne from "../../services/categories/categoriesListOne.service";

const categoriesListPropertiesController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const category = await categoryListServiceOne(id);

    return res.status(200).json(category);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default categoriesListPropertiesController;
