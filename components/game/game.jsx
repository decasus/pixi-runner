import {useRef, useEffect, useState} from "react";
import RunnerGame from "./src/Game";

const Game = () => {
    const ref = useRef(null);
    const [score, setScore] = useState(0);

    useEffect(() => {

        const game = RunnerGame;
        ref.current.appendChild(game.view);

        game.init();
        game.start();

        return () => {

            //game.stop();
            game.destroy(true, true);
            //clearInterval(heroAnim);
            //document.removeEventListener("touchstart", touchStart);
            //document.removeEventListener("touchend", touchEnd);
        }

    }, []);

    return (<div>
        <div>Ваши жизни: {score}</div>
        <div ref={ref}></div>
    </div>);
}


export default Game;
