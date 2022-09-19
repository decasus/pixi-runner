import {Sprite, Texture} from "pixi.js";
import {houseSources} from "../../../../constants/constants";

export default class House extends Sprite {
    constructor(x = 0, y = 0) {
        super();
        this.anchor.set(0.5);
        this.scale.set(0.7);
        this.x = x;
        this.y = y;
        this.texture = Texture.from(houseSources[Math.floor(Math.random() * houseSources.length)]);
    }

    reset = () => {
        this.texture = Texture.from(houseSources[Math.floor(Math.random() * houseSources.length)]);
    }
}