const interceptRequest = async (req, response, request) => {
  if ("unique" in request) {
    const unique = request.unique(req.body);
    for (key in unique) {
      const validate = await unique[key].validate(response);
      if (validate.hasError) {
        return validate.throwErr();
      }
    }
  }

  if ("accessible" in request && !request.accessible()) {
    return false;
  }

  const { error, value } = request.rules().validate(req.body);
  if (error) {
    response.send({ message: "Validation Error", details: error.details });
    console.error(error);
    return false;
  }
  return value;
};

module.exports = interceptRequest;
