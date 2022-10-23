import AppDataSource from "../../data-source";

import { Properties } from "../../entities/properties.entity";
import { Schedules_users_properties } from "../../entities/schedules_users_properties";
import { User } from "../../entities/user.entity";

import { AppError } from "../../errors/appError";

const schedulesListService = async (id: string) => {
  const schedulesRepository = AppDataSource.getRepository(
    Schedules_users_properties
  );
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const propertyBadID = await propertiesRepository.find();

  const filterPropertyBadID = propertyBadID.filter((value) => {
    return value.id === id;
  });

  if (filterPropertyBadID.length === 0) {
    throw new AppError(404, " BAD ID");
  }

  const usersRepository = AppDataSource.getRepository(User);

  const users = await usersRepository.find({
    where: {
      schedules: {
        propertyid: {
          id: id,
        },
      },
    },
    relations: { schedules: true },
  });

  const schedules = await schedulesRepository.find({
    where: {
      propertyid: {
        schedules: true,
      },
    },
  });

  const propertiesId = await propertiesRepository.find();

  const values = propertiesId.filter((valuies) => valuies.id === id);

  const properties = await propertiesRepository.findOne({
    select: {
      schedules: true,
    },
    where: {
      id: id,
    },
  });

  return { schedules };
};

export default schedulesListService;
