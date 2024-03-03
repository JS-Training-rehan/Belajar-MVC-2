class Trainer {
  id;
  name;
  type;
  expInYear;
  members;

  constructor(id, name, type, expInYear, members = []) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.expInYear = expInYear;
    this.members = members;
  }
}

class FullTimeTrainer extends Trainer {
  constructor(id, name, expInYear, members) {
    super(id, name, "FullTimeMember", expInYear, members);
  }
}

class PartTimeTrainer extends Trainer {
  constructor(id, name, expInYear, members) {
    super(id, name, "PartTimeTrainer", expInYear, members);
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
  getIdCard() {
    return this.#id_card;
  }
  setIdCard(id_card) {
    this.#id_card = id_card;
  }
}

class Factory {
  static createTrainer(id, name, type, expInYear, members) {
    let classMember = this.createListMember(members);

    if (type === "FullTimeTrainer") {
      return new FullTimeTrainer(id, name, expInYear, classMember);
    } else if (type === "PartTimeTrainer") {
      return new PartTimeTrainer(id, name, expInYear, classMember);
    }
  }
  static createMember(name, type, id_card, weight, height) {
    let member = new Member(name, type, id_card, weight, height);
    member.setIdCard(id_card);
    return member;
  }
  static createListMember(member) {
    const list = [];

    for (let i = 0; i < member.length; i++) {
      let newMember = this.createMember(
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
