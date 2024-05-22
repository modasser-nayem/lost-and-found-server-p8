import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authSchemaValidation from "./auth.validation";
import authControllers from "./auth.controller";
import auth from "../../middlewares/auth";

const router = Router();

// user registration
router.post(
  "/register",
  validateRequest(authSchemaValidation.registerUser),
  authControllers.registerUser,
);

// user login
router.post(
  "/login",
  validateRequest(authSchemaValidation.loginUser),
  authControllers.loginUser,
);

// change password
router.post(
  "/change-password",
  auth(),
  validateRequest(authSchemaValidation.changePassword),
  authControllers.changePassword,
);

const authRoutes = router;
export default authRoutes;
