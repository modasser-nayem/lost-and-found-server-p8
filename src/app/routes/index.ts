import { Router } from "express";
import authRoutes from "../modules/Auth/auth.routes";
import userRoutes from "../modules/User/user.routes";
import lostItemRoutes from "../modules/LostItem/lostItem.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

const routes = router;
export default routes;
