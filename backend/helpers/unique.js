class Unique {
  constructor(repository, fieldName, response = null) {
    this.repository = repository;
    this.fieldName = fieldName;
    this.response = response;
    this.validate = this.validate.bind(this);
  }

  async validate(response = null) {
    let data = {
      hasError: false,
    };

    const find = await this.repository(this.fieldName);

    if (find && this.fieldName) {
      const res = response ? response : this.response;
      data = {
        hasError: true,
        throwErr() {
          return res.status(422).json({
            message: "Error: Value already exist",
            field: this.fieldName,
          });
        },
      };
    }

    return data;
  }
}

module.exports = Unique;
