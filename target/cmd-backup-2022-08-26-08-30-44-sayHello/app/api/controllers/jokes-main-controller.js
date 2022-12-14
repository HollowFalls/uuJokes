"use strict";
const JokesMainAbl = require("../../abl/jokes-main-abl.js");

class JokesMainController {
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
