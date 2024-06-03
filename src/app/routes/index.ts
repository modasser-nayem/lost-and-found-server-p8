import { Router } from "express";
import authRoutes from "../modules/Auth/auth.routes";
import userRoutes from "../modules/User/user.routes";
import lostItemRoutes from "../modules/LostItem/lostItem.routes";
import foundItemRoutes from "../modules/FoundItem/foundItem.routes";
import claimItemRoutes from "../modules/ClaimItem/claimItem.routes";
import reportsRoutes from "../modules/reports/reports.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/users",
    routes: userRoutes,
  },
  {
    path: "/lost-items",
    routes: lostItemRoutes,
  },
  {
    path: "/found-items",
    routes: foundItemRoutes,
  },
  {
    path: "/claims",
    routes: claimItemRoutes,
  },
  {
    path: "/reports",
    routes: reportsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

const routes = router;
export default routes;
