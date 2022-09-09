import {useRef, useEffect, useState} from "react";
import * as PIXI from "pixi.js";

const Game = () => {
    const ref = useRef(null);

    const [score, setScore] = useState(0);

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
        //hero.scale.set(0.7, 0.7);
        app.stage.addChild(hero);

        const enemy = new PIXI.Sprite.from('images/enemy_1.png');
        enemy.anchor.set(0.5);
        enemy.x = app.screen.width / 2;
        enemy.y = -50;
        //enemy.scale.set(0.7, 0.7);
        app.stage.addChild(enemy);

        //app.stage.interactive = true;
        //app.stage.on("click", moveLeft);
        //app.stage.on("keydown", moveLeft);

        function moveLeft(e) {
            if(e.keyCode === 65) console.log('left')
            //if(e.keyCode === 68) hero.x += 100;
        }

        document.addEventListener("keydown", moveLeft);

        app.ticker.add(gameLoop);

        let speed = 2;

        function gameLoop(delta) {
            enemy.y += speed;
            if (rectIntersect(hero, enemy)) {
                //speed = 0;
                setScore(1);
                enemy.y = -50;
            }
        }

        app.start();

        return () => {
            app.destroy(true, true);
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

export default Game;
