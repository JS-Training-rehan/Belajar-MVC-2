const Controller = require("./Controllers/controller.js");
const comand = process.argv[2]; // ini buat menangkap argument di terminal

switch (comand) {
  case "read":
    Controller.read();
    break;

  default:
    break;
}
