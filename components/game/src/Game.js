import {Sprite, Texture} from "pixi.js";
import {enemyPositions, enemySources, houseSources} from "../../../constants/constants";

export class Hero extends Sprite {
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

export class House extends Sprite {
    constructor(x = 0, y = 0) {
        super();
        this.anchor.set(0.5);
        this.scale.set(0.7);
        this.x = x;
        this.y = y;
        this.texture = Texture.from(houseSources[Math.floor(Math.random() * houseSources.length)]);
    }
}

export class Wave extends Sprite {
    constructor() {
        super();
        this.x = 200;
        this.y = 800;
        this.anchor.set(0.5);
        this.scale.set(0.5);
        this.texture = Texture.from('images/wave.png');
    }
}

export class Enemy extends Sprite {
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

export class EnemyFactory {
    create(path, container) {
        for (let i = 0; i < path.length; i++) {
            path[i].forEach((value, index) => {
                if(!value) {
                    //Math.floor(Math.random() * 2) &&
                    container.addChild(new Enemy(enemyPositions[index], -100 * i));
                }
            })
        }
    }
}
