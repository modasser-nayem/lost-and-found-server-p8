import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import foundItemControllers from "./foundItem.controllers";
import foundItemSchemaValidation from "./foundItem.validation";

const router = Router();

// Report found item
router.post(
  "/",
  auth(),
  validateRequest(foundItemSchemaValidation.reportFoundItem),
  foundItemControllers.reportFoundItem,
);

// Get my found items
router.get("/my", auth(), foundItemControllers.getMyFoundItems);

// Get all found items
router.get("/", foundItemControllers.getAllFoundItems);

// Get single found items
router.get("/:id", foundItemControllers.getSingleFoundItems);

// Update found item
router.put(
  "/:id",
  auth(),
  validateRequest(foundItemSchemaValidation.updateFoundItem),
  foundItemControllers.updateFoundItem,
);

// delete found item
router.delete("/:id", auth(), foundItemControllers.deleteFoundItem);

const foundItemRoutes = router;
export default foundItemRoutes;
