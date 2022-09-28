import {Sprite, Texture} from "pixi.js";

export default class House extends Sprite {
    constructor(x = 0, y = 0, texture) {
        super();
        this.anchor.set(0.5);
        this.scale.set(0.7);
        this.x = x;
        this.y = y;
        this.texture = texture;
    }
}