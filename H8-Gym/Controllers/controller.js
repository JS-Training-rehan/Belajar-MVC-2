const Model = require("../Models/model.js");
const View = require("../Views/view.js");

class Controller {
  static read() {
    Model.readAll((err, data) => {
      if (err) {
        View.error(err);
      } else {
        View.read(data);
      }
    });
  }

  static addMember() {}

  static removeMember() {}

  static train() {}

  static showBMI() {}
}

module.exports = Controller;
