import Enemy from "./sprites/Enemy";
import House from "./sprites/House";
import Bonus from "./sprites/Bonus";
import Factory from "./Factory";


export default class GameFactory extends Factory {
    constructor() {
        super();
    }
    createItem = (type) => {
        if (type === "Enemy") return new Enemy();
        if (type === "House") return new House();
        if (type === "Bonus") return new Bonus();
    }
}