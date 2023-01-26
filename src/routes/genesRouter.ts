import { Router } from "express";
import { createAlias, createGene, deleteGene, getGenes, getGenesById, updateGene } from "../controllers/genes.controller.js";
import { validateSchema } from "../middlewares/schemaValidation.middleware.js";
import { aliasesSchema } from "../models/aliases.schema.js";
import { genesSchema } from "../models/genes.schema.js";

const genesRoute = Router();

genesRoute.get("/genes", getGenes)
genesRoute.get("/genes/:id", getGenesById)
genesRoute.post("/genes/:id/aliases", validateSchema(aliasesSchema), createAlias)
genesRoute.post("/genes", validateSchema(genesSchema), createGene)
genesRoute.delete("/genes/:id", deleteGene)
genesRoute.put("/genes/:id", validateSchema(genesSchema), updateGene)

export default genesRoute;
