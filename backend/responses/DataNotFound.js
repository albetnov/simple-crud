const DataNotFound = (response, additionals = []) => {
  return response.status(404).json({
    message: "Error: Given Data Not Found.",
    status_code: 404,
    additionals,
  });
};

module.exports = DataNotFound;
