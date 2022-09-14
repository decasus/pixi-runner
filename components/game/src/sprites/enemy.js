import {Sprite, Texture} from "pixi.js";
import {enemySources} from "../../../../constants/constants";

export default class Enemy extends Sprite {
    constructor(x, y) {
        super();
        this.anchor.set(0.5);
        this.scale.y = 0.5;
        this.scale.x = [0.5, -0.5][Math.floor(Math.random() * 2)];
        this.x = x;
        this.y = y;
        this.texture = Texture.from(enemySources[Math.floor(Math.random() * enemySources.length)]);
    }
}