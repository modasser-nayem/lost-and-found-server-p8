import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import lostItemSchemaValidation from "./lostItem.validation";
import lostItemControllers from "./lostItem.controllers";

const router = Router();

// Report lost item
router.post(
  "/",
  auth(),
  validateRequest(lostItemSchemaValidation.reportLostItem),
  lostItemControllers.reportLostItem,
);

// Get my lost items
router.get("/my", auth(), lostItemControllers.getMyLostItems);

// Get all lost items
router.get("/", lostItemControllers.getAllLostItems);

// Get single lost items
router.get("/:id", lostItemControllers.getSingleLostItems);

// Update lost item
router.put(
  "/:id",
  auth(),
  validateRequest(lostItemSchemaValidation.updateLostItem),
  lostItemControllers.updateLostItem,
);

// Update lost item found status
router.patch("/:id", auth(), lostItemControllers.updateLostItem);

// delete lost item
router.delete("/:id", auth(), lostItemControllers.deleteLostItem);

const lostItemRoutes = router;
export default lostItemRoutes;
