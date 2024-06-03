import { Router } from "express";
import reportControllers from "./reports.controllers";

const router = Router();

// total item count report
router.get("/", reportControllers.totalItemCountReport);

const reportsRoutes = router;
export default reportsRoutes;
