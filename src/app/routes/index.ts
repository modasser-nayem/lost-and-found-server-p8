import { Router } from "express";
import authRoutes from "../modules/Auth/auth.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

const routes = router;
export default routes;
