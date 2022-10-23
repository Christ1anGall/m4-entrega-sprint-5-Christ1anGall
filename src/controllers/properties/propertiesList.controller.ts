import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import propertiesListService from "../../services/properties/propertiesList.service";

const propertiesListController = async (req: Request, res: Response) => {
  try {
    const properties = await propertiesListService();

    return res.status(200).json(properties);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default propertiesListController;
