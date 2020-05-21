export default class Spell {
  constructor(data) {
    this._id = data.id || data._id;
    this.name = data.name;
    this.description = "No Description";
    this.level = data.level;
    this.range = data.range;
    this.duration = data.duration;
    this.components = data.components;
    this.user = "austin";
    this.currentSpell = data.currentSpell || false;

    console.log("hello from model");
  }

  get Template() {
    return /*html*/ `
        <div class="card">
                        
                        <div class="card-body">
                            <h4 class="card-title">${this.name}</h4>
                            <p class="card-text">${this.description} | ${this.level}</p>
                            <p class="card-text">${this.range} | ${this.duration}</p>
                        </div>
                        
                        ${this.ButtonTemplate}
                        
                    </div>`;
  }

  get ButtonTemplate() {
    if (this.currentSpell) {
      return /*html*/ `<button onclick="app.spellsController.deleteMySpell('${this._id}')">Delete</button>`;
    } else {
      return /*html*/ `<button onclick = "app.spellsController.addMySpell('${this._id}')" >Add Spell</button>`;
    }
  }
}
