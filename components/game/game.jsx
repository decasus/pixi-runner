import {useRef, useEffect, useState} from "react";
import * as PIXI from "pixi.js";

const Game = () => {
    const ref = useRef(null);
    //const [score, setScore] = useState(0);

    useEffect(() => {

        const app = new PIXI.Application({
            width: 390,
            height: 844,
            backgroundColor: 0x323232,
        });

        ref.current.appendChild(app.view);

        const hero = new PIXI.Sprite.from('images/hero.png');
        hero.anchor.set(0.5);
        hero.x = app.screen.width / 2;
        hero.y = app.screen.height - 100;
        hero.zIndex = 1;
        app.stage.addChild(hero);

        const numberOfEnemies = 4
        const enemies = new PIXI.Container();
        enemies.zIndex = 0;
        const enemiesPositions = [70, 200, 320];

        function createEnemy(pos) {
            const enemy = new PIXI.Sprite.from('images/enemy_1.png');
            enemy.anchor.set(0.5);
            enemy.x = enemiesPositions[randomInt(0, 2)];
            enemy.y = -250 * pos;
            enemies.addChild(enemy);
            console.log(enemies.children);
        }

        for (let i = 0; i < numberOfEnemies; i++) {
            createEnemy(i);
        }

        app.stage.addChild(enemies);

        let touchstartX = 0
        let touchendX = 0

        const checkDirection = () => {
            if (touchendX < touchstartX) {
                hero.x -= 100;
            }
            if (touchendX > touchstartX) {
                hero.x += 100;
            }
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

        let speed = 2;
        let time = 0;
        let step = 1;

        function gameLoop(delta) {
            time += 0.1 * delta;
            if (time > step) {
                step++;
                hero.scale.x = (hero.scale.x === -1) ? 1 : -1;
            }
            enemies.children.forEach(enemy => {
                enemy.y += speed * delta;
                if (rectIntersect(hero, enemy) && enemy.alpha === 1) {
                    enemy.alpha = 0.2;
                    //setScore(score => score + 1);
                }
                if (enemy.y > 900) {
                    enemies.removeChild(enemy);
                    createEnemy(1);
                }
            });
        }

        app.start();

        console.log("GAME STARTED")

        return () => {
            app.destroy(true, true);
            document.removeEventListener("touchstart", touchStart);
            document.removeEventListener("touchend", touchEnd);
            console.log("GAME DESTROYED")
        }

    }, []);

    return (
        <div>
            {/*<div>Ваш счёт: {score}</div>*/}
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
