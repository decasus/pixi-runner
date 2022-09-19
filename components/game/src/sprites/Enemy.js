import {Loader, Sprite} from "pixi.js";
import {enemySources} from "../../../../constants/constants";
import {randomInt} from "../../../../utils/randomInt";

export default class Enemy extends Sprite {
    constructor(x = 0, y = 0) {
        super();
        this.anchor.set(0.5);
        this.scale.y = 0.5;
        this.scale.x = [0.5, -0.5][Math.floor(Math.random() * 2)];
        this.x = x;
        this.y = y;
        this.texture = [Loader.shared.resources['enemy_1'].texture, Loader.shared.resources['enemy_2'].texture][randomInt(0, 1)];
    }

    reset = () => {
        this.scale.x = [0.5, -0.5][Math.floor(Math.random() * 2)];
        this.texture = [Loader.shared.resources['enemy_1'].texture, Loader.shared.resources['enemy_2'].texture][randomInt(0, 1)];
        this.alpha = 1;
    }
}