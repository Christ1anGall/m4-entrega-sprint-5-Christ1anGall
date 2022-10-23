import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import propertiesCreateService from "../../services/properties/propertiesCreate.service";

const propertiesCreateController = async (req: Request, res: Response) => {
  try {
    const { value, size, address, categoryId } = req.body;

    const newProperties = await propertiesCreateService({
      value,
      size,
      address,
      categoryId,
    });

    return res.status(201).json(newProperties);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default propertiesCreateController;
