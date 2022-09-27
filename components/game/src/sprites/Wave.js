import {Sprite, Texture} from "pixi.js";

export default class Wave extends Sprite {
    constructor() {
        super();
        this.x = 200;
        this.y = 800;
        this.anchor.set(0.5);
        this.scale.set(0.5);
        this.texture = Texture.from('images/wave.png');
    }
}

