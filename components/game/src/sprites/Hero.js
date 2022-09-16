import {Loader, Sprite, Texture} from "pixi.js";

export default class Hero extends Sprite {
    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
        this.anchor.set(0.5);
        this.scale.set(0.7);
        this.texture = Loader.shared.resources['hero'].texture;
        this.moveLeft = 0;
        this.moveRight = 0;
    }


}