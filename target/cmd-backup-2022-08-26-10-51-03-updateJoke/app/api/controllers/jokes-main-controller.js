"use strict";
const JokesMainAbl = require("../../abl/jokes-main-abl.js");

class JokesMainController {

  listJokes(ucEnv) {
    return JokesMainAbl.listJokes(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  deleteJoke(ucEnv) {
    return JokesMainAbl.deleteJoke(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  getJoke(ucEnv) {
    return JokesMainAbl.getJoke(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  createJoke(ucEnv) {
    return JokesMainAbl.createJoke(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sayHello(ucEnv) {
    return JokesMainAbl.sayHello(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  init(ucEnv) {
    return JokesMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return JokesMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return JokesMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new JokesMainController();
