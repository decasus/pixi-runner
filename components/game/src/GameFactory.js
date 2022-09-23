import Enemy from "./sprites/Enemy";
import House from "./sprites/House";
import Bonus from "./sprites/Bonus";
import Factory from "./Factory";

export default class GameFactory extends Factory {
    constructor() {
        super();
    }
    createItem = (type) => {
        switch(type) {
            case "Enemy": return new Enemy();
            case "House": return new House();
            case "Bonus": return new Bonus();
        }
    }
}