const Model = require("../Models/model.js");
const View = require("../Views/view.js");

class Controller {
  static read() {
    Model.readAll((err, data) => {
      // console.log("data conttroler", data);
      if (err) {
        View.error(err);
      } else {
        View.read(data);
      }
    });
  }

  static addMember(id, name, type, id_card, weight, height) {
    Model.addMember(id, name, type, id_card, weight, height, (err, name) => {
      if (err) {
        View.error(err);
      } else {
        View.successAddMember(name, id);
      }
    });
  }

  static removeMember(id, id_card) {
    Model.removeMember(id, id_card, (err, id_card) => {
      if (err) {
        View.error(err);
      } else {
        View.successRemoveMember(id, id_card);
      }
    });
  }

  static train(id_card, weight) {
    Model.train(id_card, weight, (err, weight) => {
      if (err) {
        View.error(err);
      } else {
        View.successTrain(id_card, weight);
      }
    });
  }

  static showBMI() {
    Model.calculateBMI((err, bmiData) => {
      if (err) {
        View.error(err);
      } else {
        View.dataBMI(bmiData);
      }
    });
  }
}

module.exports = Controller;
