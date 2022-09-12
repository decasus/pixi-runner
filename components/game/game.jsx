import {useRef, useEffect, useState} from "react";
import * as PIXI from "pixi.js";

const enemySources = ['images/enemy_1.png', 'images/enemy_2.png'];
const homeSources = ['images/home-1.png', 'images/home-2.png', 'images/home-3.png', 'images/home-4.png', 'images/home-5.png', 'images/home-6.png', 'images/home-7.png']

const Game = () => {
    const ref = useRef(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        console.log('test');
        const app = new PIXI.Application({
            width: 390,
            height: 844,
            backgroundColor: 0x323232,
            antialias: true
        });

        ref.current.appendChild(app.view);

        // Hero

        const hero = new PIXI.Sprite.from('images/hero.png');
        hero.anchor.set(0.5);
        hero.x = app.screen.width / 2;
        hero.y = app.screen.height - 100;
        hero.scale.set(0.7)
        hero.zIndex = 1;
        app.stage.addChild(hero);

        // Houses

        for (let i = 0; i < 13; i++) {
            const home = new PIXI.Sprite.from(homeSources[randomInt(0, 6)]);
            home.anchor.set(0.5);
            home.x = 14;
            home.y = 70*i+1;
            home.scale.set(0.7);
            app.stage.addChild(home);
        }

        for (let i = 0; i < 13; i++) {
            const home = new PIXI.Sprite.from(homeSources[randomInt(0, 6)]);
            home.anchor.set(0.5);
            home.x = 376;
            home.y = 70*i+1;
            home.scale.set(0.7);
            app.stage.addChild(home);
        }

        // Wave

        const wave = new PIXI.Sprite.from('images/wave.png');
        hero.anchor.set(0.5);
        wave.x = 0;
        wave.y = 750;
        wave.scale.set(0.5);
        wave.zIndex = 999;
        app.stage.addChild(wave);

        const numberOfEnemies = 6
        const enemies = new PIXI.Container();
        enemies.zIndex = 0;
        const enemiesPositions = [90, 160, 240, 320];


        function createEnemy(pos, m = randomInt(0, 3)) {
            const enemy = new PIXI.Sprite.from(enemySources[randomInt(0, 1)]);
            enemy.anchor.set(0.5);
            enemy.scale.set(0.5);
            enemy.x = enemiesPositions[m];
            enemy.y = -150 * pos;
            enemy.zIndex = -5;
            enemies.addChild(enemy);
        }

        for (let i = 0; i < numberOfEnemies; i++) {
            createEnemy(i, 0);
            createEnemy(i, 1);
            createEnemy(i, 2);
            createEnemy(i, 3);
        }

        app.stage.addChild(enemies);

        let touchstartX = 0
        let touchendX = 0
        let moveHeroLeft = 0
        let moveHeroRight = 0

        const checkDirection = () => {
            if (touchendX < touchstartX) moveHeroLeft = hero.x - 70;
            if (touchendX > touchstartX) moveHeroRight = hero.x + 70;
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

        const heroAnim = setInterval(() => {
            hero.scale.x = (hero.scale.x === -0.7) ? 0.7 : -0.7;
        }, 100 * speed);

        function gameLoop(delta) {
            time += 0.1 * delta;

            if (moveHeroLeft) hero.x > moveHeroLeft ? hero.x -= 10 : moveHeroLeft = 0;
            if (moveHeroRight) hero.x < moveHeroRight ? hero.x += 10 : moveHeroRight = 0;

            enemies.children.forEach(enemy => {
                enemy.y += speed * delta;
                if (rectIntersect(hero, enemy) && enemy.alpha === 1) {
                    enemy.alpha = 0.2;
                    setScore(score => score + 1);
                }
                if (enemy.y > 900) {
                    enemies.removeChild(enemy);
                    createEnemy(1);
                }
            });
        }

        app.start();


        return () => {
            app.destroy(true, true);
            clearInterval(heroAnim);
            document.removeEventListener("touchstart", touchStart);
            document.removeEventListener("touchend", touchEnd);
        }

    }, []);

    return (
        <div>
            <div>Ваш счёт: {score}</div>
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
