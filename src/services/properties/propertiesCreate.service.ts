import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const propertiesCreateService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  if (address.state.length > 2) {
    throw new AppError(400, "addres need to has 2 digits max");
  }

  if (address.zipCode.length > 8) {
    throw new AppError(400, "zipCode need to has 8 digits max");
  }

  const propertiesRepository = AppDataSource.getRepository(Properties);
  const addresRepository = AppDataSource.getRepository(Address);
  const categories = AppDataSource.getRepository(Categories);

  const categorie = await categories.find();

  const category = categorie.filter(
    (categories) => categories.id === categoryId
  );

  if (category.length === 0) {
    throw new AppError(404, "ivalid ID");
  }

  const findedAddres = await addresRepository.find();

  let filterAddres = findedAddres.find(
    (addresExist) => addresExist.district === address.district
  );

  if (filterAddres) {
    throw new AppError(400, " addres already exists");
  }

  if (!!category[0]?.id) {
    const property = new Properties();

    property.value = value;
    property.size = size;

    property.categoryid = category[0];

    property.createdAt = new Date();
    property.updatedAt = new Date();

    const newAdress = new Address();

    newAdress.district = address.district;
    newAdress.zipCode = address.zipCode;
    newAdress.number = address.number || " ";
    newAdress.city = address.city;
    newAdress.state = address.state;
    addresRepository.create(newAdress);
    await addresRepository.save(newAdress);

    const addresFindId = await addresRepository.findOne({
      where: {
        id: newAdress.id,
      },
    });

    property.addressid = addresFindId!;

    propertiesRepository.create(property);

    await propertiesRepository.save(property);

    const savedProperty = await propertiesRepository.findOne({
      where: {
        id: property.id,
      },
    });

    return {
      id: savedProperty?.id,
      address: newAdress,
      value: savedProperty?.value,
      size: savedProperty?.size,
      category: category,
      sold: savedProperty?.sold,
      createdAt: savedProperty?.createdAt,
      updatedAt: savedProperty?.updatedAt,
    };
  } else {
    throw new AppError(404, "invalid category");
  }
};

export default propertiesCreateService;
