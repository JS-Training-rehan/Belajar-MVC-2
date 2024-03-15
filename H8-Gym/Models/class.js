class Trainer {
  id;
  name;
  type;
  expInYears;
  members;

  constructor(id, name, type, expInYears, members = []) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.expInYears = expInYears;
    this.members = members;
  }
}

class FullTimeTrainer extends Trainer {
  constructor(id, name, expInYears, members) {
    super(id, name, "FullTimeMember", expInYears, members);
  }
}

class PartTimeTrainer extends Trainer {
  constructor(id, name, expInYears, members) {
    super(id, name, "PartTimeTrainer", expInYears, members);
  }
}

class Member {
  name;
  type;
  #id_card;
  weight;
  height;
  constructor(name, type, id_card, weight, height) {
    this.name = name;
    this.type = type;
    this.#id_card = id_card;
    this.weight = weight;
    this.height = height;
  }

  calculateBMI() {
    const heightInMeter = this.height / 100;
    const bmi = this.weight / (heightInMeter * heightInMeter);
    return bmi;
  }

  getIdCard() {
    return this.#id_card;
  }
  setIdCard(id_card) {
    this.#id_card = id_card;
  }
}
class Reguler extends Member {
  constructor(name, id_card, weight, height) {
    super(name, "Reguler", id_card, weight, height);
  }
}
class VIP extends Member {
  constructor(name, id_card, weight, height) {
    super(name, "VIP", id_card, weight, height);
  }
}

class Factory {
  static createTrainer(type, id, name, expInYears, members) {
    let classMember = this.createListMember(members);

    if (type === "Full Time" || type === "FullTimeMember") {
      return new FullTimeTrainer(id, name, expInYears, classMember);
    } else if (type === "Part Time" || type === "PartTimeTrainer") {
      return new PartTimeTrainer(id, name, expInYears, classMember);
    }
  }

  static createMember(name, type, id_card, weight, height) {
    let member = new Member(name, type, id_card, weight, height);
    // member.setIdCard(id_card);
    if (type === "Reguler") {
      return new Reguler(name, id_card, weight, height);
    } else if (type === "VIP") {
      return new VIP(name, id_card, weight, height);
    }
    return member;
  }

  static createListMember(member) {
    const list = [];

    for (let i = 0; i < member.length; i++) {
      let newMember = new Member(
        member[i].name,
        member[i].type,
        member[i].id_card,
        member[i].weight,
        member[i].height
      );
      list.push(newMember);
    }
    return list;
  }
}

module.exports = Factory;
