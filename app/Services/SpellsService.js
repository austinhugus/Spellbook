import store from "../store.js";
import Spell from "../Models/Spell.js";

// @ts-ignore
const _spellApi = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/",
  //   timeout: 3000,
});

const _deleteApi = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/austin/spells",
  //   timeout: 3000,
});

console.log("hello from service");

class SpellsService {
  getMySpells() {
    _spellApi
      .get("austin/spells")
      .then((res) => {
        console.log("My spells");
        console.log(res.data.data);
        let spells = res.data.data.map((s) => {
          s.currentSpell = true;
          return new Spell(s);
        });
        store.commit("mySpells", spells);
      })
      .catch((error) => console.log(error));
  }

  deleteMySpell(id) {
    let deleteObject = store.State.mySpell;
    console.log(deleteObject);
    _deleteApi
      .delete(id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    this.getMySpells();
  }
  addMySpell(id) {
    let activeSpell = store.State.activeSpell;
    console.log(activeSpell);
    activeSpell.currentSpell = true;
    store.commit("mySpell", activeSpell);
    _spellApi.post("austin/spells", activeSpell);
  }
  makeActiveSpell(id) {
    _spellApi.get("spells/" + id).then((res) => {
      console.log(res);
      let activeSpell = new Spell(res.data);
      store.commit("activeSpell", activeSpell);
    });
  }
  constructor() {
    this.getspellApi();
    this.getMySpells();
  }

  getspellApi() {
    _spellApi
      .get("spells")
      .then((res) => {
        let spells = res.data.map((s) => new Spell(s));
        console.log(res);
        store.commit("spells", spells);
      })
      .catch((e) => console.error(e));
  }
}

const service = new SpellsService();
export default service;
