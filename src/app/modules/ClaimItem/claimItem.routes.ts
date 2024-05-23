import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import claimItemSchemaValidation from "./claimItem.validation";
import claimItemControllers from "./claimItem.controllers";

const router = Router();

// create claim request
router.post(
  "/",
  auth(),
  validateRequest(claimItemSchemaValidation.createClaimRequest),
  claimItemControllers.createClaimRequest,
);

// update claim request
router.put(
  "/:id",
  auth(),
  validateRequest(claimItemSchemaValidation.updateClaimRequest),
  claimItemControllers.updateClaimRequest,
);

// update claim status
router.patch(
  "/:id",
  auth(),
  validateRequest(claimItemSchemaValidation.updateClaimStatus),
  claimItemControllers.updateClaimStatus,
);

// get my claim requests
router.get("/my", auth(), claimItemControllers.getMyClaimRequests);

// get single claim request
router.get("/:id", auth(), claimItemControllers.getSingleClaimRequest);

// get claim requests by found item id
router.get(
  "/found/:id",
  auth(),
  claimItemControllers.getClaimRequestsByFoundItemId,
);

// delete claim request
router.delete("/:id", auth(), claimItemControllers.deleteClaimRequest);

const claimItemRoutes = router;
export default claimItemRoutes;
