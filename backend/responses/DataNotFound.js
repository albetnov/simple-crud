const DataNotFound = (response, additionals = []) => {
  return response.status(404).json({
    message: "Error: Given Data Not Found.",
    status: 404,
    additionals,
  });
};

module.exports = DataNotFound;
