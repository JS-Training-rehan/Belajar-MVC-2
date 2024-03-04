const fs = require("fs");
const Factory = require("./class");

class Model {
  static saveJSON(payload, callback) {
    const json = JSON.stringify(payload, null, 2);
    fs.writeFile("./data.json", json, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  }
  static readAll(callback) {
    fs.readFile("./data.json", "utf-8", (err, data) => {
      if (err) {
        return callback(err, null);
      }
      const json = JSON.parse(data);
      // console.log(json);

      const result = [];

      for (let i = 0; i < json.length; i++) {
        const newTrainer = Factory.createTrainer(
          json[i].type,
          json[i].id,
          json[i].name,
          json[i].expInYears,
          json[i].members
        );
        // console.log(json[i].type);
        // console.log(json[i].id);
        // console.log(json[i].name);
        // console.log(json[i].expInYear);
        // console.log(json[i].members);

        result.push(newTrainer);
        // console.log(newTrainer);
      }

      callback(null, result);
    });
  }

  static addMember() {}

  static removeMember() {}

  static train() {}
}

module.exports = Model;
