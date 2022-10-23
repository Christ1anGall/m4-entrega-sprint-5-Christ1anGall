import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Categories } from "../../entities/categories.entity";
import { ICategoryCreate } from "../../interfaces/categories";

const categoriesCreateService = async ({ name }: ICategoryCreate) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = await categoriesRepository.find();

  const nameAlreadyExists = categories.find(
    (category) => category.name === name
  );

  if (nameAlreadyExists) {
    throw new AppError(400, "Categories Already Exists");
  }

  const category = new Categories();

  category.name = name;

  await categoriesRepository.save(category);

  return {
    name: category.name,
    id: category.id,
  };
};

export default categoriesCreateService;
