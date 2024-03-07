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
      if (!json) return callback(err, null);

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
        // console.log(json[i].expInYears);
        // console.log(json[i].members);

        result.push(newTrainer);
        // console.log(newTrainer);
      }

      callback(null, result);
    });
  }

  static addMember(id, name, type, id_card, weight, height, callback) {
    id = parseInt(id);
    id_card = parseInt(id_card);
    // console.log(id);
    weight = parseFloat(weight);
    height = parseFloat(height);
    this.readAll((err, data) => {
      if (err) {
        callback(err, null);
        return;
      }
      // console.log(this.readAll);
      // index
      let newMember = data.find((trainer) => trainer.id === id);
      // console.log("newMember:", newMember);
      let indexTrainer = data.findIndex((trainer) => trainer.id === id);
      // console.log("indextrainer :", indexTrainer);

      if (!newMember) {
        return callback(err, null);
      }

      if (newMember.members.some((member) => member.id_card === id_card)) {
        callback(`ID Card ${id_card} sudah di pakai`, null);
        return;
      }
      let totalMember = newMember.members.length;
      if (totalMember >= newMember.limit) {
        callback("karena jumlah member sudah penuh", null);
        return;
      }
      const member = Factory.createMember(name, type, id_card, weight, height);

      let memberJson = {
        name: member.name,
        type: member.type,

        weight: member.weight,
        height: member.height,
        id_card: member.getIdCard(),
      };
      // console.table(memberJson);
      // console.log("ini nama :", member.name);
      // console.log("ini type :", member.type);
      // console.log("ini id_card :", member.id_card);
      // console.log("ini weight :", member.weight);
      // console.log("ini height :", member.height);
      //member baru

      data[indexTrainer].members.push(memberJson);
      console.log("data:", data);
      this.saveJSON(data, (err) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, name);
        }
      });
    });
  }
  static removeMember(id, id_card, callback) {
    id = parseInt(id);
    console.log(id);
    id_card = parseInt(id_card);
    console.log(id_card);

    this.readAll((err, data) => {
      if (err) {
        callback(err, null);
        return;
      }
      let trainMember = data.find((trainer) => trainer.id === id);
      console.log(trainMember);

      if (!trainMember) {
        callback(`${id} tidak ditemukan`, null);
        return;
      }

      if (!trainMember.member || trainMember.member.length === 0) {
        callback(`Anggota id card ${id_card} tidak ditemukan`, null);
        return;
      }

      let idMember = trainMember.member.findIndex(
        (member) => member.id_card === id_card
      );

      if (idMember === -1) {
        callback(`Anggota dengan id card ${id_card} tidak ditemukan`, null);
        return;
      } else {
        console.log("id card member:", id_card);
        trainMember.member.splice(idMember, 1);
        this.saveJSON(data, (err) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, idMember);
          }
        });
      }
    });
  }

  static train() {}
}

module.exports = Model;
