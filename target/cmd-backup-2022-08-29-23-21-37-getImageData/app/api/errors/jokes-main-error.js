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
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}sayHello/`,
  
};

const CreateJoke = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}createJoke/`,
  
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor(){
      super(...arguments);
      this.code = `${CreateJoke.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeImageDaoCreateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeImageDaoCreateFailed`;
      this.message = "Create of jokeImage by jokeImage Dao create failed.";
    }
  },
  JokeDaoCreateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeDaoCreateFailed`;
      this.message = "Create of joke by joke Dao create failed.";
    }
  }
};

const GetJoke = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}getJoke/`,
  
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor(){
      super(...arguments);
      this.code = `${GetJoke.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const DeleteJoke = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}deleteJoke/`,
  
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor(){
      super(...arguments);
      this.code = `${DeleteJoke.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const ListJokes = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}listJokes/`,
  
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor(){
      super(...arguments);
      this.code = `${ListJokes.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const UpdateJoke = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}updateJoke/`,
  
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor(){
      super(...arguments);
      this.code = `${UpdateJoke.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  UpdateJoke,
  ListJokes,
  DeleteJoke,
  GetJoke,
  CreateJoke,
  SayHello,
  Init,
};
