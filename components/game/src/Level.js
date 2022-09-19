import Hero from "./sprites/Hero";
import {Container} from "pixi.js";
import Router from "./Router";
import {enemyPositions} from "../../../constants/constants";
import {rectIntersect} from "../../../utils/rectIntersect";
import GameFactory from "./GameFactory";
import {randomInt} from "../../../utils/randomInt";
import Bonus from "./sprites/Bonus";

export default class Level extends Container {
    constructor() {
        super();
        this.time = 0;
        this.distance = 0;
        this.showLevelAnim = false;
    }

    init = (updateDistance, updateLifeCount) => {
        this.speed = 4;
        this.hero = new Hero(235, 900);
        this.enemies = new Container();
        this.addChild(this.hero);
        this.addChild(this.enemies);
        this.router = new Router();
        this.factory = new GameFactory();
        this.updateDistance = updateDistance;
        this.updateLifeCount = updateLifeCount;
    }

    show = () => {
        this.showLevelAnim = true;
        /*this.hero.x = 235;
        this.hero.y = 720;*/
    }

    gameLoop = (delta) => {
        this.time++;

        if(this.showLevelAnim) this.hero.y > 750 ? this.hero.y -= 2 : this.showLevelAnim = 0;

        if (this.distance > 100) this.speed = 6;
        if (this.distance > 200) this.speed = 8;

        if (this.hero.moveLeft) this.hero.x > this.hero.moveLeft ? this.hero.x -= 10 : this.hero.moveLeft = 0;
        if (this.hero.moveRight) this.hero.x < this.hero.moveRight ? this.hero.x += 10 : this.hero.moveRight = 0;

        if (this.time % Math.round(50 / this.speed) === 1) this.hero.scale.x = (this.hero.scale.x === -0.7) ? 0.7 : -0.7;

        if(this.time < 100) return;

        if (this.time % Math.round(200 / this.speed) === 1) {
            this.distance++
            this.updateDistance(this.distance);
            const matrix = this.router.createMatrix();
            matrix.forEach((matrixLine, lineIndex) => {
                matrixLine.forEach((value, index) => {
                    if (!value) {
                        let maxRandom;
                        maxRandom = (this.speed === 4) ? 2 : (this.speed === 6) ? 1 : 0;
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
                if(enemy instanceof Bonus) {
                    this.distance += 10;
                    this.updateDistance(this.distance);
                }
                else this.updateLifeCount();
                enemy.alpha = 0.2;
            }
            if (enemy.y > 1000) {
                enemy.isActive = false;
                this.enemies.removeChild(enemy)
            }
        });
    }
}