import {Application, Container, Renderer} from "pixi.js";
import Hero from "./sprites/hero";
import House from "./sprites/house";
import Wave from "./sprites/wave";
import EnemyFactory from "./EnemyFactory";


class RunnerGame extends Application {

    constructor() {
        super();
        this.speed = 4;
        this.renderer = new Renderer({
            width: 390, height: 844, backgroundColor: 0x323232, antialias: true
        });
        this.state = 0;
    }

// Меняем состояние
    init() {
        let speed = 4;

        const hero = new Hero(235, 720);
        this.stage.addChild(hero);
        const heroAnim = hero.animate(this.speed);

        for (let i = 0; i < 13; i++) {
            this.stage.addChild(new House(14, 75 * i + 1));
            this.stage.addChild(new House(376, 75 * i + 1));
        }

        //this.stage.addChild(new Wave());

        const enemies = new Container();
        this.stage.addChild(enemies);

        const pathSize = 4;

        let prevRoutes;
        do prevRoutes = [randomInt(0, 3), randomInt(0, 3)]
        while (Math.abs(prevRoutes[1] - prevRoutes[0]) === 1)

        // TODO Роуты не зависят друг от друга, идет вперед на (n, ...n) клеток вне зависимости от другого роута

        function generateRoute(n = 2, size = 4) {
            let routes = [0, 0];
            prevRoutes.forEach((route, i) => {
                const direction = randomInt(0, 1);
                if (route === 3) direction ? routes[i] = route : routes[i] = route - 1 // Тупик справа
                else if (route === 0) direction ? routes[i] = route + 1 : routes[i] = route // Тупик слева
                else direction ? routes[i] = route - 1 : routes[i] = route + 1 // Нет тупика
            })
            prevRoutes = routes;
            let output = [0, 0, 0, 0];
            routes.forEach(el => output[el] = 1);
            return output;
        }

        let lastLine = [1, 1, 1, 1];

        function createMatrix() {
            const matrix = [];
            const route = generateRoute();
            let transition;
            for (let i = 0; i < pathSize; i++) {
                if (i === 0) {
                    transition = route.map((item, index) => lastLine[index] === 1 ? 1 : item)
                    matrix.push(transition);
                } else matrix.push(route);
            }
            lastLine = route;
            matrix.forEach(el => console.log(el))
            return matrix;
        }

        const enemyFactory = new EnemyFactory();

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
        document.addEventListener("touchend", touchEnd);

        this.ticker.add(gameLoop);

        let steps = 0;

        let time = 0;


        function gameLoop(delta) {
            time += 0.1 * delta;
            steps++;

            if (steps % 95 === 1) enemyFactory.create(createMatrix(), enemies)

            if (hero.moveLeft) hero.x > hero.moveLeft ? hero.x -= 10 : hero.moveLeft = 0;
            if (hero.moveRight) hero.x < hero.moveRight ? hero.x += 10 : hero.moveRight = 0;
            enemies.children.forEach(enemy => {
                enemy.y += speed * delta;
                if (rectIntersect(hero, enemy) && enemy.alpha === 1) {
                    enemy.alpha = 0.2;
                    //setScore(score => score - 1);
                }
                if (enemy.y > 900) enemies.removeChild(enemy)
            });
        }
    }
}

export default new RunnerGame();

function rectIntersect(a, b) {
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width &&
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO ФАБРИКА ВОЗВРАЩАЕТ ПУСТОЙ ОБЪЕКТ - БАЗОВАЯ ФАБРИКА
// TODO КАСТОМНАЯ ФАБРИКА
// TODO ФУНКЦИЯ RESET В КЛАССЕ ИЛИ В ФАБРИКЕ