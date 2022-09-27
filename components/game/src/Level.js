import Hero from "./sprites/Hero";
import {Container, filters, Loader} from "pixi.js";
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
        this.lifeCount = 3;
        this.immunity = false;
        this.gameOver = false;
    }

    init = () => {
        this.speed = 4;
        this.hero = new Hero(235, 900);
        this.blocks = new Container();
        this.addChild(this.hero);
        this.addChild(this.blocks);
        this.router = new Router();
        this.factory = new GameFactory();
    }

    clear = () => {
        this.removeChild(this.hero);
        this.removeChild(this.blocks);
    }

    showAnim = (resolve) => {
        let showAnimInterval = setInterval(() => {
            if (this.hero.y > 750) this.hero.y -= 2;
            else {
                clearInterval(showAnimInterval);
                resolve();
            }
        }, 20)
    }

    loseAnim = (resolve) => {
        this.gameOver = true;
        const loseAnimInterval = setInterval(() => {
            if (this.alpha > 0) this.alpha -= 0.05;
            else {
                clearInterval(loseAnimInterval);
                resolve();
            }
        }, 50);
    }

    handleHeroMovement = () => {
        if (this.hero.moveLeft) this.hero.x > this.hero.moveLeft ? this.hero.x -= 10 : this.hero.moveLeft = 0;
        if (this.hero.moveRight) this.hero.x < this.hero.moveRight ? this.hero.x += 10 : this.hero.moveRight = 0;
    }

    animateHero = () => {
        if (this.time % Math.round(50 / this.speed) === 1) {
            if(this.immunity === true) this.hero.alpha = (this.hero.alpha === 0.2) ? 1 : 0.2;
            else this.hero.alpha = 1;
            this.hero.scale.x = (this.hero.scale.x === -0.7) ? 0.7 : -0.7;
        }
    }

    spawnEnemy = (x, y) => {
        const maxRandom = (this.speed === 4) ? 2 : (this.speed === 6) ? 1 : 0;
        const chance = randomInt(0, maxRandom);
        if (!chance) {
            const texture = [Loader.shared.resources['enemy_1'].texture, Loader.shared.resources['enemy_2'].texture][randomInt(0, 1)];
            const enemy = this.factory.getItem("Enemy", texture);
            enemy.x = enemyPositions[x];
            enemy.y = -100 * y;
            this.blocks.addChild(enemy);
        }
    }

    spawnBonus = (x, y) => {
        const bonus = this.factory.getItem("Bonus");
        bonus.x = enemyPositions[x];
        bonus.y = -100 * y;
        this.blocks.addChild(bonus);
    }

    setImmunity = () => {
        this.immunity = true;
        const timeout = setTimeout(() => {
            this.immunity = false;
            clearTimeout(timeout)
        }, 3000);
    }

    gameLoop = (delta) => {

        if (this.gameOver) return;
        if (this.lifeCount === 0) this.requestState('loseAnim');

        this.time++;

        // Двигаем героя если переданы координаты
        this.handleHeroMovement();

        // Анимируем героя
        this.animateHero();

        // Задержка до появления первых блоков
        if (this.time < 100) return;

        // Генерация новых блоков
        if (this.time % Math.round(200 / this.speed) === 1) {
            this.distance++;
            this.updateDistance(this.distance);

            // Проверяем дистанцию и увеличиваем скорость (делаем паузу 5 блоков после повышения скорости)
            if (this.distance > 50 && this.distance < 55) return this.speed = 6;
            if (this.distance > 100 && this.distance < 105) return this.speed = 8;

            const matrix = this.router.createMatrix();
            matrix.forEach((matrixLine, lineIndex) => {
                matrixLine.forEach((value, index) => {
                    if (!value) this.spawnEnemy(index, lineIndex);
                    if (this.time % Math.round(400 / this.speed) === 1 &&
                        index === randomInt(0, 3) &&
                        lineIndex === 1 &&
                        matrixLine[index])
                        this.spawnBonus(index, lineIndex);
                })
            });
        }

        // Проверка столкновений
        this.blocks.children.forEach(block => {
            block.y += this.speed * delta;
            if (rectIntersect(this.hero, block) && block.alpha === 1) {
                if (block instanceof Bonus) {
                    this.distance += 10;
                    this.updateDistance(this.distance);
                } else {
                    if (!this.immunity) {
                        this.lifeCount -= 1;
                        this.updateLifeCount(this.lifeCount);
                        this.setImmunity();
                    }
                }
                block.alpha = 0.2;
            }
            if (block.y > 1000) {
                block.isActive = false;
                this.blocks.removeChild(block)
            }
        });
    }
}