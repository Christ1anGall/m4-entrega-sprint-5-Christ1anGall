import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const categoryListServiceOne = async (id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categoriesId = await categoriesRepository.find();

  const result = categoriesId.filter((value) => value.id === id);

  if (result.length === 0) {
    throw new AppError(404, "ivalid ID");
  }
  const category = await categoriesRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  return category;
};

export default categoryListServiceOne;
