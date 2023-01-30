import Joi from "joi";
import dateExtension from "@joi/date";
import { Gene } from "../protocols/gene";

export const genesSchema = Joi.object<Gene>({
    hgncSymbol: Joi.string().required().min(2),
    hgncName: Joi.string().required().min(2),
    description: Joi.string().required().min(2)
});
