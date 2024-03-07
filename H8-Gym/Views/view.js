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

  static success(data) {}

  static BMI(data) {}
}

module.exports = View;
