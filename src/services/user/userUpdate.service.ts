import { hash, hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const userUpdateService = async (
  isAdm: boolean,
  useRquesID: string,
  name: string,
  email: string,
  password: string,
  idWillUpdate: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === idWillUpdate);

  if (account === undefined) {
    throw new AppError(404, "BAD ID OR NOT FOUND");
  }

  if (isAdm === false) {
    if (useRquesID !== idWillUpdate) {
      throw new AppError(401, "user not is ADM");
    }
  }

  const userUpdated = await userRepository.update(idWillUpdate, {
    name: name ? name : account.name,
    email: email ? email : account.email,
    password: password ? hashSync(password, 10) : account.password,
    updatedAt: new Date(),
  });

  return userUpdated;
};

export default userUpdateService;
