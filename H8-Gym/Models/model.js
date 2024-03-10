const fs = require("fs");
const Factory = require("./class");

class Model {
  static saveJSON(payload, callback) {
    // const newData = [];
    // for (let i = 0; i < payload.length; i++) {
    //   const element = payload[i];
    //   let temp = {
    //     ...element,
    //   };
    //   if (element.members.length > 0) {
    //     let dataMember = [];
    //     for (let j = 0; j < element.members.length; j++) {
    //       const memberObjek = element.members[j];
    //       let newMember = {
    //         ...memberObjek,
    //       };
    //       newMember.id_card = memberObjek.getIdCard();
    //       // newMember.id_card = memberObjek.id_card;
    //       dataMember.push(newMember);
    //     }
    //     temp.members = dataMember;
    //   }
    //   newData.push(temp);
    //   // console.log(newData);
    // }
    // console.log(newData[0]);
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
      // console.log("ini JSON AWAL :", json);
      if (!json) return callback(err, null);
      const newData = [];
      const result = [];
      for (let i = 0; i < json.length; i++) {
        const newTrainer = Factory.createTrainer(
          json[i].type,
          json[i].id,
          json[i].name,
          json[i].expInYears,
          json[i].members
        );
        newData.push(newTrainer);
        // console.log("newTrainer :", newTrainer);
      }

      for (let j = 0; j < newData.length; j++) {
        const element = newData[j];
        let temp = {
          ...element,
        };
        // console.log("elemen :", temp);

        if (element.members.length > 0) {
          let dataMember = [];
          for (let k = 0; k < element.members.length; k++) {
            const memberObjek = element.members[k];
            // console.log("memberObjek :", memberObjek.getIdCard());
            let newMember = {
              ...memberObjek,
            };
            newMember.id_card = memberObjek.getIdCard();
            dataMember.push(newMember);
          }
          temp.members = dataMember;
        }
        result.push(temp);
        // console.log("newData di readAll:", newData);
      }

      // result.push(newData);
      // console.log(result);

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
      // console.log("data:", data);
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
    id_card = String(id_card);
    // console.log("input id : ", id);
    // console.log("input id card : ", id_card);

    this.readAll((err, data) => {
      if (err) {
        callback(err, null);
        return;
      }

      let trainMember = data.find((trainer) => trainer.id === id);
      // console.log(data);
      // console.log("train member :", trainMember);

      if (!trainMember) {
        callback(`Trainer dengan id ${id} tidak ditemukan`, null);
        return;
      }

      if (!trainMember.members || trainMember.members.length === 0) {
        callback(`Anggota id card ${id_card} tidak ditemukan`, null);
        return;
      }

      let indexMember = trainMember.members.findIndex(
        (members) => members.id_card === id_card
      );
      // console.log("idmember:", idMember);

      if (!indexMember) {
        callback(`Anggota dengan id card ${id_card} tidak ditemukan`, null);
        return;
      } else {
        trainMember.members.splice(indexMember, 1);
        console.log(data);
        this.saveJSON(data, (err) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, id_card);
          }
        });
      }
    });
  }
  // static trainWeight(id, name, weight) {
  //   id = parseInt(id);

  //   this.readAll((err, data) => {
  //     if (err) {
  //       callback(err, null)
  //     }
  //     let trainWeightMember = dta
  //   })
}

module.exports = Model;
