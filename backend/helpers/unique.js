class Unique {
  constructor(repository, fieldName, response = null) {
    this.repository = repository;
    this.fieldName = fieldName;
    this.response = response;
    this.intentional = false;
    this.validate = this.validate.bind(this);
    this.skipSelf = this.skipSelf.bind(this);
  }

  async skipSelf(id) {
    const find = await this.repository(this.fieldName);

    if (find && parseInt(find.id) === parseInt(id)) {
      this.intentional = true;
    }
    return this;
  }

  async validate(response = null) {
    let data = {
      hasError: false,
    };

    const find = await this.repository(this.fieldName);
    console.log(this.intentional);
    if (!this.intentional && find && this.fieldName) {
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
