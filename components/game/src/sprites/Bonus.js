import {Loader, Sprite} from "pixi.js";

export default class Bonus extends Sprite {
    constructor(x = 0, y = 0) {
        super();
        this.anchor.set(0.5);
        this.scale.y = 0.5;
        this.scale.x = 0.5;
        this.x = x;
        this.y = y;
        this.texture = Loader.shared.resources['bonus'].texture;
    }

    reset = () => {
        this.texture = Loader.shared.resources['bonus'].texture;
        this.alpha = 1;
    }
}