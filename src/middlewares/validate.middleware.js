import { ZodSchema } from "zod";

const validate =
  (schema, property) =>
  (req, res, next) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      return res.status(400).json({ message: err.errors?.[0]?.message || 'Validation error' });
    }

    next();
  };

export const validateBody = (schema) => validate(schema, "body");
export const validateParams = (schema) => validate(schema, "params");
export const validateQuery = (schema) => validate(schema, "query");
