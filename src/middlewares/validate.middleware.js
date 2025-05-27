import { ZodSchema } from "zod";

const validate =
  (schema, property) =>
  (req, res, next) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      console.log(result.error.format());
      return res.status(400).json({ errors: result.error.format()});
    }

    next();
  };

export const validateBody = (schema) => validate(schema, "body");
export const validateParams = (schema) => validate(schema, "params");
export const validateQuery = (schema) => validate(schema, "query");
