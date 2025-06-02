export const validate = (schema, property = 'body') => {
  return async function (req, res, next) {
    try {
      const data = req[property] || {}
      const validatedData = await schema.validateAsync(data, {
        abortEarly: false, // Collect all errors, not just the first
      });

      req[property] = validatedData;
      next();
    } catch (err) {
      console.log(err.message)
      res.message = err.details?.map(e => e.message) || [err.message];
      return util.validationErrorResponse(res);
    }
  };
};
