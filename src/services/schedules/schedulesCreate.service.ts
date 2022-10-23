import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules_users_properties } from "../../entities/schedules_users_properties";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const schedulesCreateCreateService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) => {
  const schedules = AppDataSource.getRepository(Schedules_users_properties);
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const userRepository = AppDataSource.getRepository(User);

  const propertyBadID = await propertiesRepository.find();

  const filterPropertyBadID = propertyBadID.filter((value) => {
    return value.id === propertyId;
  });

  if (filterPropertyBadID.length === 0) {
    throw new AppError(404, " BAD ID");
  }

  const badHour = hour.split(":");

  if (parseInt(badHour[0]) <= 8) {
    throw new AppError(400, "bad hour");
  }

  if (parseInt(badHour[0]) >= 18) {
    throw new AppError(400, "bad hour");
  }

  const today = new Date().getDate();

  const daySchele = date.split("/")[2];

  if (today < parseInt(daySchele)) {
    throw new AppError(400, "bad date");
  }

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const property = await propertiesRepository.findOne({
    where: {
      id: propertyId,
    },
  });

  const newSchedules = new Schedules_users_properties();

  const newDAte = date.split("/").join("-");

  newSchedules.date = new Date(newDAte);
  newSchedules.propertyid = property!;
  newSchedules.user = user!;

  newSchedules.hour = new Date(`${newDAte}T${hour}`);

  const schedulesId = await schedules.find();

  const dateFinded = schedulesId.filter((value) => {
    return (
      value.hour.toString() ===
      new Date(`${newDAte}T${hour}`).toTimeString().split(" ")[0]
    );
  });

  if (dateFinded.length > 0) {
    throw new AppError(400, "already exists");
  }

  await schedules.save(newSchedules);

  return {
    message: {
      date: newSchedules.date,
      hour: newSchedules.hour,
      propertyid: newSchedules.propertyid,
      userid: newSchedules.user,
    },
  };
};

export default schedulesCreateCreateService;
