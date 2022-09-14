import {Sprite, Texture} from "pixi.js";

export default class Hero extends Sprite {
    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
        this.anchor.set(0.5);
        this.scale.set(0.7);
        this.texture = Texture.from('/images/hero.png');
        this.moveLeft = 0;
        this.moveRight = 0;
    }

    animate(speed) {
        return setInterval(() => {
            this.scale.x = (this.scale.x === -0.7) ? 0.7 : -0.7;
        }, 1000 / speed);
    }
}