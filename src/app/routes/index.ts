import { Router } from "express";

const router = Router();

const moduleRoutes = [
  {
    path: "",
    routes: router.get("/"),
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

const routes = router;
export default routes;
