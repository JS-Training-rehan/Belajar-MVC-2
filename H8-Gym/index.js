const Controller = require("./Controllers/controller.js");
const comand = process.argv[2]; // ini buat menangkap argument di terminal

switch (comand) {
  case "read":
    Controller.read();
    break;

  case "addMember":
    Controller.addMember(
      process.argv[3],
      process.argv[4],
      process.argv[5],
      process.argv[6],
      process.argv[7],
      process.argv[8]
    );
    break;

  case "removeMember":
    Controller.removeMember(process.argv[3], process.argv[4]);
    break;

  case "train":
    Controller.train(process.argv[3]);
    break;

  case "bmi":
    Controller.showBMI();
    break;

  default:
    break;
}
