import {Sprite} from "pixi.js";

export default class Enemy extends Sprite {
    constructor(x = 0, y = 0, texture) {
        super();
        this.anchor.set(0.5);
        this.scale.y = 0.5;
        this.scale.x = [0.5, -0.5][Math.floor(Math.random() * 2)];
        this.x = x;
        this.y = y;
        this.texture = texture;
    }

    reset = () => {
        this.scale.x = [0.5, -0.5][Math.floor(Math.random() * 2)];
        this.alpha = 1;
    }
}