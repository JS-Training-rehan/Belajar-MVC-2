class View {
  static read(data) {
    console.log(data);
  }

  static error(err) {
    console.log("Terjadi kesalahan ", err);
  }

  static success(data) {}

  static BMI(data) {}
}

module.exports = View;
