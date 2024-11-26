import { Router } from "express";
import {
  createUser,
  getUser,
  login,
  userDelete,
  userEdit,
  userList,
} from "../controllers/userController.js";
import validacionUsuario from "../helpers/validationUsers.js";
import validateJWT from "../helpers/verifyJWT.js";
import authorizeRole from "../helpers/validateRole.js";

const router = Router();
router
  .route("/users")
  .post([validateJWT, authorizeRole(["Admin"]), validacionUsuario], createUser)
  .get([validateJWT, authorizeRole(["Admin"])], userList);
router
  .route("/users/:id")
  .get([validateJWT, authorizeRole(["Admin", "Usuario"])], getUser)
  .put([validateJWT, authorizeRole(["Admin", "Usuario"])], userEdit)
  .delete([validateJWT, authorizeRole(["Admin"])], userDelete);
router.route("/login").post(login);

export default router;
