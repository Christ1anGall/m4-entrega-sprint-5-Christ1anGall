import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";

import schedulesListService from "../../services/schedules/schedulesList.service";

const schedulesListController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const schedules = await schedulesListService(id);

    return res.status(200).json(schedules);
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
};

export default schedulesListController;
