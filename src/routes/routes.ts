import { Router } from "express";
import categoriesCreateController from "../controllers/categories/categoriesCreate.controller";
import categoryListController from "../controllers/categories/categoriesList.controller";
import categoriesListPropertiesController from "../controllers/categories/categoriesListProperties.controller";
import propertiesCreateController from "../controllers/properties/propertiesCreate.controller";
import propertiesListController from "../controllers/properties/propertiesList.controller";
import schedulesCreateController from "../controllers/schedules/schedulesCreate.controller";
import schedulesListController from "../controllers/schedules/schedulesList.controller";
import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";
import userListController from "../controllers/users/userList.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import { isAdmUser } from "../middleware/isUserAdm.middleware";
import tokenMiddleware from "../middleware/tokenAuth.middleware";

const routes = Router();

routes.post("/users", userCreateController);
routes.get("/users", isAdmUser, userListController);

routes.patch("/users/:id", tokenMiddleware, userUpdateController);
routes.delete("/users/:id", isAdmUser, userDeleteController);

routes.post("/login", userLoginController);

routes.post("/properties", isAdmUser, propertiesCreateController);
routes.get("/properties", propertiesListController);

routes.post(
  "/categories",
  tokenMiddleware,
  isAdmUser,
  categoriesCreateController
);
routes.get("/categories", categoryListController);
routes.get("/categories/:id/properties", categoriesListPropertiesController);

routes.post("/schedules", tokenMiddleware, schedulesCreateController);
routes.get("/schedules/properties/:id", isAdmUser, schedulesListController);

export default routes;
