import {Application, Container, Renderer, Texture} from "pixi.js";
import Hero from "./sprites/Hero";
import House from "./sprites/House";
import Wave from "./sprites/Wave";
import Factory from "./Factory";
import Enemy from "./sprites/Enemy";
import {enemyPositions} from "../../../constants/constants";
import Router from "./Router";
import {rectIntersect} from "../../../utils/rectIntersect";

class RunnerGame extends Application {

    constructor() {
        super();
        this.renderer = new Renderer({
            width: 390, height: 844, backgroundColor: 0x323232, antialias: true
        });
        this.state = 0;
        this.intervals = [];
        this.events = [];
        this.time = 0;
    }

// Меняем состояние
    init() {
        let speed = 4;

        const hero = new Hero(235, 720);
        this.stage.addChild(hero);
        this.intervals.push(hero.animate(speed));

        const houses = new Container();
        this.stage.addChild(houses);

        //this.stage.addChild(new Wave());

        const enemies = new Container();
        this.stage.addChild(enemies);

        const router = new Router();

        let touchstartX = 0
        let touchendX = 0

        const checkDirection = () => {
            if (touchendX < touchstartX && hero.x > 75) hero.moveLeft = hero.x - 80;
            if (touchendX > touchstartX && hero.x < 315) hero.moveRight = hero.x + 80;
        }

        const touchStart = (e) => {
            touchstartX = e.changedTouches[0].screenX;
        }
        const touchEnd = (e) => {
            touchendX = e.changedTouches[0].screenX;
            checkDirection()
        }

        document.addEventListener("touchstart", touchStart);
        this.events.push({type: "touchstart", handler: touchStart})
        document.addEventListener("touchend", touchEnd);
        this.events.push({type: "touchend", handler: touchEnd})

        const factory = new Factory();

        const gameLoop = (delta) => {
            this.time++;

            if (hero.moveLeft) hero.x > hero.moveLeft ? hero.x -= 10 : hero.moveLeft = 0;
            if (hero.moveRight) hero.x < hero.moveRight ? hero.x += 10 : hero.moveRight = 0;

            if (this.time % 50 === 1) {
                const matrix = router.createMatrix();
                matrix.forEach((matrixLine, lineIndex) => {
                    matrixLine.forEach((value, index) => {
                        if (!value) {
                            const enemy = factory.create("Enemy");
                            enemy.x = enemyPositions[index];
                            enemy.y = -100 * lineIndex;
                            enemies.addChild(enemy);
                        }
                    })
                });
/*                for (let i = 0; i < 6; i++) {
                    const houseLeft = factory.create("House");
                    houseLeft.x = 14;
                    houseLeft.y = 75 * (i-5);
                    houses.addChild(houseLeft);
                    const houseRight = factory.create("House");
                    houseRight.x = 376;
                    houseRight.y = 75 * (i-5);
                    houses.addChild(houseRight);
                }*/
            }

/*            houses.children.forEach(house => {
                house.y += speed * delta;
                if(house.y > 900) {
                    house.isActive = false;
                    houses.removeChild(house)
                }
            });*/
            enemies.children.forEach(enemy => {
                enemy.y += speed * delta;
                if (rectIntersect(hero, enemy) && enemy.alpha === 1) {
                    enemy.alpha = 0.2;
                    //setScore(score => score - 1);
                }
                if (enemy.y > 1000) {
                    enemy.isActive = false;
                    enemies.removeChild(enemy)
                }
            });
        }
        this.ticker.add(gameLoop);
    }
    clear() {
        this.intervals.forEach(interval => clearInterval(interval))
        this.events.forEach(e => document.removeEventListener(e.type, e.handler))
    }
}

export const game = new RunnerGame();


// TODO ФАБРИКА ВОЗВРАЩАЕТ ПУСТОЙ ОБЪЕКТ - БАЗОВАЯ ФАБРИКА
// TODO КАСТОМНАЯ ФАБРИКА
// TODO ФУНКЦИЯ RESET В КЛАССЕ ИЛИ В ФАБРИКЕ