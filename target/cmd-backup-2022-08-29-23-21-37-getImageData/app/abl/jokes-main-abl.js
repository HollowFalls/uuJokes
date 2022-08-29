"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/jokes-main-error.js");
const { BinaryStoreError } = require("uu_appg01_binarystore");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },
  createJokeUnsupportedKeys: {
    code: `${Errors.CreateJoke.UC_CODE}unsupportedKeys`,
  },
  getJokeUnsupportedKeys: {
    code: `${Errors.GetJoke.UC_CODE}unsupportedKeys`,
  },
  deleteJokeUnsupportedKeys: {
    code: `${Errors.DeleteJoke.UC_CODE}unsupportedKeys`,
  },
  listJokesUnsupportedKeys: {
    code: `${Errors.ListJokes.UC_CODE}unsupportedKeys`,
  },
  updateJokeUnsupportedKeys: {
    code: `${Errors.UpdateJoke.UC_CODE}unsupportedKeys`,
  },
  getImageDataUnsupportedKeys: {
    code: `${Errors.getImageData.UC_CODE}unsupportedKeys`
  },
};

const logger = LoggerFactory.get("JokesMainAbl");

class JokesMainAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("jokesMain");
    this.dao.createSchema();
    this.jokeImageDao = DaoFactory.getDao("jokeImage");
  }

  async updateJoke(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("updateJokeDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateJokeUnsupportedKeys.code,
      Errors.UpdateJoke.InvalidDtoIn
    )
    
    let dtoOut = {};
    
    let daoObj = await this.dao.get(awid, dtoIn.id);
    if (daoObj) {
      for (let key in dtoIn){
        daoObj[key] = dtoIn[key];
      }
      dtoOut = this.dao.update(daoObj);
    }
    else {
      dtoOut = {
        "status": "Failure",
        "error": "There is no object with this id."};
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async listJokes(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("listJokesDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listJokesUnsupportedKeys.code,
      Errors.ListJokes.InvalidDtoIn
    )

    let dtoOut = await this.dao.listByVisibility(awid, true, dtoIn.pageInfo);
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async deleteJoke(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("deleteJokeDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteJokeUnsupportedKeys.code,
      Errors.DeleteJoke.InvalidDtoIn
    )
    let dtoOut = {};
    let daoObj = await this.dao.get(awid, dtoIn.id);

    if (!daoObj) {
      await this.dao.remove(daoObj);
      dtoOut = {"status": "Successfully deleted object with id: " + dtoIn.id};
    }
    else {
      dtoOut = {
        "status": "Failure",
        "error": "There is no object with this id."
    };
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async getJoke(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("getJokeDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getJokeUnsupportedKeys.code,
      Errors.GetJoke.InvalidDtoIn
    )


    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (dtoOut) {
      dtoOut.uuAppErrorMap = uuAppErrorMap;
    }
    else {
      dtoOut = {
        "status": "Failure",
        "error": "There is no object with this id.",
        uuAppErrorMap
      };
    }

    return dtoOut;
  }

  async create(awid, dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);
    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
      );

    // hds 2
    let jokeImage;
    if (dtoIn.image) {
      try {
        jokeImage = await this.jokeImageDao.create({awid}, dtoIn.image);
      } catch (e) {
        if (e instanceof BinaryStoreError) { // A3
          throw new Errors.Create.JokeImageDaoCreateFailed({uuAppErrorMap}, e);
        }
        throw e;
      }
      dtoIn.image = jokeImage.code;
    }

    // hds 3
    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.jokeDao.create(dtoIn);
    } catch (e) { // A4
      if (jokeImage) {
        await this.jokeImageDao.deleteByCode(awid, jokeImage.code);
      }
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.JokeDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    // hds 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async sayHello(awid, dtoIn) {
    
  }

  async init(uri, dtoIn, session) {
    const awid = uri.getAwid();
    // HDS 1
    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    // HDS 2
    const schemas = ["jokesMain"];
    let schemaCreateResults = schemas.map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // A3
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    if (dtoIn.uuBtLocationUri) {
      const baseUri = uri.getBaseUri();
      const uuBtUriBuilder = UriBuilder.parse(dtoIn.uuBtLocationUri);
      const location = uuBtUriBuilder.getParameters().id;
      const uuBtBaseUri = uuBtUriBuilder.toUri().getBaseUri();

      const createAwscDtoIn = {
        name: "UuJokes",
        typeCode: "uu-jokes-maing01",
        location: location,
        uuAppWorkspaceUri: baseUri,
      };

      const awscCreateUri = uuBtUriBuilder.setUseCase("uuAwsc/create").toUri();
      const appClientToken = await AppClientTokenService.createToken(uri, uuBtBaseUri);
      const callOpts = AppClientTokenService.setToken({ session }, appClientToken);

      // TODO HDS
      let awscId;
      try {
        const awscDtoOut = await AppClient.post(awscCreateUri, createAwscDtoIn, callOpts);
        awscId = awscDtoOut.id;
      } catch (e) {
        if (e.code.includes("applicationIsAlreadyConnected") && e.paramMap.id) {
          logger.warn(`Awsc already exists id=${e.paramMap.id}.`, e);
          awscId = e.paramMap.id;
        } else {
          throw new Errors.Init.CreateAwscFailed({ uuAppErrorMap }, { location: dtoIn.uuBtLocationUri }, e);
        }
      }

      const artifactUri = uuBtUriBuilder.setUseCase(null).clearParameters().setParameter("id", awscId).toUri();

      await UuAppWorkspace.connectArtifact(
        baseUri,
        {
          artifactUri: artifactUri.toString(),
          synchronizeArtifactBasicAttributes: false,
        },
        session
      );
    }

    // HDS 3
    if (dtoIn.uuAppProfileAuthorities) {
      try {
        await Profile.set(awid, "Authorities", dtoIn.uuAppProfileAuthorities);
      } catch (e) {
        if (e instanceof UuAppWorkspaceError) {
          // A4
          throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.uuAppProfileAuthorities }, e);
        }
        throw e;
      }
    }

    // HDS 4 - HDS N
    // TODO Implement according to application needs...

    // HDS N+1
    const workspace = UuAppWorkspace.get(awid);

    return {
      ...workspace,
      uuAppErrorMap: uuAppErrorMap,
    };
  }

  async load(uri, session, uuAppErrorMap = {}) {
    // HDS 1
    const dtoOut = await UuAppWorkspace.load(uri, session, uuAppErrorMap);

    // TODO Implement according to application needs...
    // if (dtoOut.sysData.awidData.sysState !== "created") {
    //   const awid = uri.getAwid();
    //   const appData = await this.dao.get(awid);
    //   dtoOut.data = { ...appData, relatedObjectsMap: {} };
    // }

    // HDS 2
    return dtoOut;
  }

  async loadBasicData(uri, session, uuAppErrorMap = {}) {
    // HDS 1
    const dtoOut = await UuAppWorkspace.loadBasicData(uri, session, uuAppErrorMap);

    // TODO Implement according to application needs...
    // const awid = uri.getAwid();
    // const workspace = await UuAppWorkspace.get(awid);
    // if (workspace.sysState !== "created") {
    //   const appData = await this.dao.get(awid);
    //   dtoOut.data = { ...appData, relatedObjectsMap: {} };
    // }

    // HDS 2
    return dtoOut;
  }
}

module.exports = new JokesMainAbl();
