import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const userDeleteService = async (idReq: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === idReq);

  if (account === undefined) {
    throw new AppError(404, "user is desactive");
  }

  if (account!.isActive === false) {
    throw new AppError(400, "user is desactive");
  }

  if (account!.isAdm === false && account!.id !== idReq) {
    throw new AppError(401, "user not is ADM");
  }

  let id = idReq;

  const findUser = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  await userRepository.update(id, {
    isActive: false,
  });

  return "User Deleted";
};

export default userDeleteService;
