import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const aliasesSchema = joi.object({
    alias: joi.string().required().min(2),
    aliasOrigin: joi.string().min(2),
});
