const Unique = require("./Unique");

const interceptRequest = async (req, response, request) => {
  const result = {
    value: null,
    hasError: false,
    error: null,
  };

  if ("unique" in request) {
    const unique = await request.unique(req.body, req.params);
    for (key in unique) {
      const validate = await unique[key].validate(response);
      if (validate.hasError) {
        result.hasError = true;
        result.error = validate.throwErr();
        break;
      }
    }
  }

  if ("accessible" in request && !request.accessible()) {
    return false;
  }

  const { error, value } = request.rules().validate(req.body);

  if (error && !result.hasError) {
    result.error = response
      .status(422)
      .send({ message: "Validation Error", details: error.details });
    result.hasError = true;
  } else {
    result.value = value;
  }

  return result;
};

module.exports = interceptRequest;
