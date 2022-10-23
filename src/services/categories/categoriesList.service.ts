import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

const categoryListService = async () => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const category = await categoriesRepository.find({
    select: {
      name: true,
      id: true,
    },
  });

  return category;
};

export default categoryListService;
