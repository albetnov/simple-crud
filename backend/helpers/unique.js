const unique = async (repository, username, response) => {
  let data = null;

  const find = await repository(username);
  if (find) {
    data = {
      throwErr() {
        return response.status(422).json({
          message: "Error: Value already exist.",
          field: username,
        });
      },
    };
  }

  return data;
};

module.exports = unique;
