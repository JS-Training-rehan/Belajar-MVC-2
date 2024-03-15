class View {
  static read(data) {
    console.log(data);
  }

  static error(err) {
    console.log("===========");
    console.log("===ERROR==");
    console.log("===========");
    console.log("Terjadi kesalahan ", err);
  }

  static successAddMember(name, id) {
    console.log("==========");
    console.log("==SUKSES==");
    console.log("==========");
    console.log(`berhasil menambahkan ${name} sebagai member trainer ${id}`);
  }

  static successRemoveMember(id, id_card) {
    console.log("==========");
    console.log("==SUKSES==");
    console.log("==========");
    console.log(`berhasil menghapus ${id_card} sebagai member trainer ${id}`);
  }

  static successTrain(id_card, weight) {
    console.log("==========");
    console.log("==SUKSES==");
    console.log("==========");
    console.log(
      `member dengan id card ${id_card} berhasil menurunkan berat badan menjadi ${weight}`
    );
  }

  static dataBMI(bmiData) {
    for (const trainerName in bmiData) {
      if (bmiData.hasOwnProperty(trainerName)) {
        console.log(`Trainer: ${trainerName}`);
        console.table(bmiData[trainerName]);
      }
    }
  }
}

module.exports = View;
