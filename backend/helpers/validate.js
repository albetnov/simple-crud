const validate = (request, response, validateFn) => {
  const { error, value } = validateFn.validate(request.body);
  if (error) {
    response.send({ message: "Validation Error", details: error.details });
    console.error(error);
    return false;
  }
  return value;
};

module.exports = validate;
