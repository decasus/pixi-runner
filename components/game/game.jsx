import {useRef, useEffect, useState} from "react";
import RunnerGame from "./src/Game";
import {useDispatch, useSelector} from "react-redux";
import {gameSlice} from "../../store/gameSlice";

const Game = () => {
    const ref = useRef(null);
    const [score, setScore] = useState(0);

    const count = useSelector(state => state);
    const dispatch = useDispatch();


    useEffect(() => {

        ref.current.appendChild(RunnerGame.view);

        RunnerGame.init();
        RunnerGame.start();

        return () => {
            RunnerGame.clear();
            RunnerGame.destroy(true, true);
        }

    }, []);

    return (<div>
        <button onClick={() => dispatch(gameSlice.actions.loading())}>Start loading</button>
        <button onClick={() => dispatch(gameSlice.actions.start())}>Start game</button>
        <div>State: {count}</div>
        <div ref={ref}></div>
    </div>);
}


export default Game;
