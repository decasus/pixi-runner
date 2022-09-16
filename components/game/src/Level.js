import Hero from "./sprites/Hero";
import {Container} from "pixi.js";
import Router from "./Router";
import {enemyPositions} from "../../../constants/constants";
import {rectIntersect} from "../../../utils/rectIntersect";
import GameFactory from "./GameFactory";
import {randomInt} from "../../../utils/randomInt";

export default class Level extends Container {
    constructor() {
        super();
        this.time = 0;
    }

    init() {
        this.speed = 4;
        this.hero = new Hero(235, 720);
        this.enemies = new Container();
        this.addChild(this.hero);
        this.addChild(this.enemies);
        this.router = new Router();
        this.factory = new GameFactory();
    }

    gameLoop = (delta) => {
        this.time++;

        if (this.time === 300) this.speed = 6;
        if (this.time === 800) this.speed = 8;

        if (this.hero.moveLeft) this.hero.x > this.hero.moveLeft ? this.hero.x -= 10 : this.hero.moveLeft = 0;
        if (this.hero.moveRight) this.hero.x < this.hero.moveRight ? this.hero.x += 10 : this.hero.moveRight = 0;

        if (this.time % Math.round(50 / this.speed) === 1) this.hero.scale.x = (this.hero.scale.x === -0.7) ? 0.7 : -0.7;

        if (this.time % Math.round(200 / this.speed) === 1) {
            const matrix = this.router.createMatrix();
            matrix.forEach((matrixLine, lineIndex) => {
                matrixLine.forEach((value, index) => {
                    if (!value) {
                        let maxRandom;
                        maxRandom = (this.speed === 4) ? 1 : 0
                        const chance = randomInt(0, maxRandom);
                        if(!chance) {
                            const enemy = this.factory.getItem("Enemy");
                            enemy.x = enemyPositions[index];
                            enemy.y = -100 * lineIndex;
                            this.enemies.addChild(enemy);
                        }
                    }
                    if (this.time % Math.round(400 / this.speed) === 1 && index === randomInt(0, 3) && lineIndex === 1 && matrixLine[index]) {
                        const bonus = this.factory.getItem("Bonus");
                        bonus.x = enemyPositions[index];
                        bonus.y = -100 * lineIndex;
                        this.enemies.addChild(bonus);
                    }
                })
            });
        }
        this.enemies.children.forEach(enemy => {
            enemy.y += this.speed * delta;
            if (rectIntersect(this.hero, enemy) && enemy.alpha === 1) {
                enemy.alpha = 0.2;

            }
            if (enemy.y > 1000) {
                enemy.isActive = false;
                this.enemies.removeChild(enemy)
            }
        });
    }

}