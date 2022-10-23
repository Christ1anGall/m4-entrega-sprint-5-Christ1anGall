import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import schedulesCreateCreateService from "../../services/schedules/schedulesCreate.service";

const schedulesCreateController = async (req: Request, res: Response) => {
  try {
    const { date, hour, propertyId } = req.body;

    const userId = req.userId!;

    const schedules = await schedulesCreateCreateService({
      date,
      hour,
      propertyId,
      userId,
    });

    return res.status(201).json(schedules);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default schedulesCreateController;
