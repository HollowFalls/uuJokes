"use strict";
const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");

const Init = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
};

const SayHello = {
  UC_CODE: `${JOKES_MAIN_ERROR_PREFIX}sayHello/`,
  
};

const CreateJoke = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}createJoke/`,
  
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor(){
      super(...arguments);
      this.code = `${CreateJoke.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const GetJoke = {
  UC_CODE: `${JOKES_MAIN_ERROR_PREFIX}getJoke/`,
  
};

module.exports = {
  GetJoke,
  CreateJoke,
  SayHello,
  Init,
};
