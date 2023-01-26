import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const genesSchema = joi.object({
    hgncSymbol: joi.string().required().min(2),
    hgncName: joi.string().required().min(2),
    description: joi.string().required().min(2)
});
