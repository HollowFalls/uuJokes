"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class JokesMainMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({name: 1}, {unique: true});
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    let filter = {
      awid: awid.toString(),
      id: id,
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }

  async listByVisibility(awid, visibility, pageInfo){
    return await super.find({awid, visibility}, pageInfo);
  }
}

module.exports = JokesMainMongo;
