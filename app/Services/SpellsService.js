import store from "../store.js";
import Spell from "../Models/Spell.js";


// @ts-ignore
const _spellApi = axios.create({
    baseURL: "http://bcw-sandbox.herokuapp.com/api/",
    timeout: 3000

})
console.log("hello from service")





class SpellsService {
    addMySpell(id) {
        let activeSpell = store.State.activeSpell
        console.log(activeSpell);
        store.commit("mySpell", activeSpell)
        _spellApi.post("austin/spells", activeSpell)

    }
    makeActiveSpell(id) {
        _spellApi.get("spells/" + id)
            .then(res => {
                console.log(res);
                ;

                let activeSpell = new Spell(res.data)
                store.commit("activeSpell", activeSpell)
            })
    }
    constructor() {
        this.getspellApi()
    }


    getspellApi() {
        _spellApi.get('spells')
            .then(res => {
                let spells = res.data.map(s => new Spell(s));
                console.log(res);
                store.commit("spells", spells)
            })
            .catch(e => console.error(e))
    }


}

const service = new SpellsService();
export default service;
