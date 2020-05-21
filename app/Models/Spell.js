export default class Spell {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.description = "No Description"
        this.level = data.level
        this.range = data.range
        this.duration = data.duration
        this.components = data.components
        this.user = "austin"

        console.log("hello from model");
    }

    get Template() {
        return `
        <div class="card">
                        <img class="card-img-top" src="//placehold.it/100x100" alt="">
                        <div class="card-body">
                            <h4 class="card-title">${this.name}</h4>
                            <p class="card-text">${this.description} | ${this.level}</p>
                            <p class="card-text">${this.range} | ${this.duration}</p>
                        </div>
                        <button onclick="app.spellsController.addMySpell('${this.id}')">Add</button>
                    </div>`
    }
}