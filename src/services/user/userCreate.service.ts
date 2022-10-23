import { IUser, IUserCreate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/appError";

const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError(400, "Email Already Exists");
  }

  const user = new User();

  user.name = name;
  user.email = email;
  user.isAdm = isAdm;
  user.isActive = true;
  user.password = bcrypt.hashSync(password, 10);
  user.createdAt = new Date();
  user.updatedAt = new Date();

  userRepository.create(user);

  await userRepository.save(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdm: user.isAdm,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export default userCreateService;
