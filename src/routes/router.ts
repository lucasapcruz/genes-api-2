import { Router } from "express";
import genesRoute from "./genesRouter.js";

const router = Router();

router.use(genesRoute);

export default router;
