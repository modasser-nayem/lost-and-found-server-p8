import { Router } from "express";
import userControllers from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userSchemaValidation from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

// Get My Profile
router.get("/me", auth(), userControllers.getMyProfile);

// Get All Users - admin
router.get("/", auth(UserRole.admin), userControllers.getAllUsers);

// Get Single User
router.get("/:id", auth(), userControllers.getSingleUser);

// Update my profile
router.put(
  "/me",
  auth(),
  validateRequest(userSchemaValidation.updateMyProfile),
  userControllers.updateMyProfile,
);

// Update user role
router.patch(
  "/role",
  auth(UserRole.admin),
  validateRequest(userSchemaValidation.updateUserRole),
  userControllers.updateUserRole,
);

// Update user status
router.patch(
  "/status",
  auth(UserRole.admin),
  validateRequest(userSchemaValidation.updateUserStatus),
  userControllers.updateUserAccountStatus,
);

// Delete Account
router.delete("/me", auth(), userControllers.deleteUser);

const userRoutes = router;
export default userRoutes;
