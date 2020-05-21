import SpellsService from "../Services/SpellsService.js";
import store from "../store.js";

//Private

function _drawSpellBook() {
  let spells = store.State.spells;
  console.log(spells);

  let template = "";
  spells.forEach((spells) => {
    template += `<li onclick="app.spellsController.makeActiveSpell('${spells._id}')">${spells.name}</li>`;
  });
  document.getElementById("spellbook").innerHTML = template;
}
function _drawActiveSpell() {
  let activeSpell = store.State.activeSpell;
  document.getElementById("active-spell").innerHTML = activeSpell.Template;
}
function _drawMySpell() {
  let mySpells = store.State.mySpells;
  let template = "";
  mySpells.forEach((s) => (template += s.Template));
  console.log(template);
  document.getElementById("my-spells").innerHTML = template;
}

//Public
export default class SpellsController {
  constructor() {
    store.subscribe("spells", _drawSpellBook);
    store.subscribe("activeSpell", _drawActiveSpell);
    store.subscribe("mySpells", _drawMySpell);
  }

  makeActiveSpell(id) {
    SpellsService.makeActiveSpell(id);
  }

  addMySpell(id) {
    SpellsService.addMySpell(id);
  }

  deleteMySpell(id) {
    SpellsService.deleteMySpell(id);
  }
}
