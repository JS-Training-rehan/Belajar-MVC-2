const Controller = require("./Controllers/controller.js");
const comand = process.argv[2]; // ini buat menangkap argument di terminal

switch (comand) {
  case "list":
    Controller.list();
    break;

  default:
    break;
}
