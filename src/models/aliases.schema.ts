import Joi from "joi";
import { CreateAlias } from "../protocols/alias.js";

export const aliasesSchema = Joi.object<CreateAlias>({
    alias: Joi.string().required().min(2),
    aliasOrigin: Joi.string().min(2),
});
