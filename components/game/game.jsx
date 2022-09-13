import {useRef, useEffect, useState} from "react";
import {EnemyFactory, Hero, House, Wave} from "./src/Game";
import {Application, Container} from "pixi.js";

const Game = () => {
    const ref = useRef(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
            const app = new Application({
                width: 390,
                height: 844,
                backgroundColor: 0x323232,
                antialias: true
            });

            ref.current.appendChild(app.view);

            let speed = 4;
            let time = 0;

            const hero = new Hero(235, 720);
            app.stage.addChild(hero);
            const heroAnim = hero.animate(speed);

            for (let i = 0; i < 13; i++) {
                const house = new House(14, 75 * i + 1)
                app.stage.addChild(house);
            }

            for (let i = 0; i < 13; i++) {
                const house = new House(376, 75 * i + 1)
                app.stage.addChild(house);
            }

            app.stage.addChild(new Wave());

            const enemies = new Container();
            app.stage.addChild(enemies);

            let path = [];
            const pathSize = 4;
            let lastRoute = 2;

            function generatePath() {
                //path = [];
                let direction = randomInt(0, 1);
                let route = lastRoute;
                let line = [];
                for (let i = 0; i < pathSize; i++) {
                    line = [0, 0, 0, 0];
                    line[route] = 1;
                    if (i === pathSize - 1) {
                        console.log(route)
                        if (route === 3) direction ? lastRoute = route : lastRoute = route - 1
                        if (route === 0) direction ? lastRoute = route + 1 : lastRoute = route
                        else direction ? lastRoute = route - 1 : lastRoute = route + 1
                        line[lastRoute] = 1;
                        console.log(lastRoute);
                    }
                    path.push(line);
                    console.log(line);
                }
            }

            generatePath();
            generatePath();
            generatePath();
            generatePath();
            generatePath();
            generatePath();
            generatePath();
            generatePath();
            generatePath();
            generatePath();
            generatePath();
            generatePath();

            const enemyFactory = new EnemyFactory();
            enemyFactory.createEnemies(path, enemies);

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

            app.ticker.add(gameLoop);

            function gameLoop(delta) {
                time += 0.1 * delta;

                if (hero.moveLeft) hero.x > hero.moveLeft ? hero.x -= 10 : hero.moveLeft = 0;
                if (hero.moveRight) hero.x < hero.moveRight ? hero.x += 10 : hero.moveRight = 0;

                enemies.y += speed * delta;
                if (enemies.y > 900) {
                    //enemies.y = 100;
                    //generatePath();
                    //enemyFactory.createEnemies(path, enemies);
                }
                enemies.children.forEach(enemy => {
                    //enemy.y += speed/2 * delta;
                    if (rectIntersect(hero, enemy) && enemy.alpha === 1) {
                        enemy.alpha = 0.2;
                        setScore(score => score - 1);
                    }
                    //if (enemy.y > 900) enemies.removeChild(enemy)
                });
            }

            app.start();

            return () => {
                app.destroy(true, true);
                clearInterval(heroAnim);
                document.removeEventListener("touchstart", touchStart);
                document.removeEventListener("touchend", touchEnd);
            }

        }, []
    )
    ;

    return (
        <div>
            <div>Ваши жизни: {score}</div>
            <div ref={ref}></div>
        </div>
    );
}

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

export default Game;
