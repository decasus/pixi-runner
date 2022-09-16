import {useRef, useEffect, useState} from "react";
import {game} from "./src/Game";
import {useDispatch, useSelector} from "react-redux";
import {loading, start} from "../../store/gameSlice";

const Game = () => {
    const ref = useRef(null);
    const [score, setScore] = useState(0);

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(loading());

        ref.current.appendChild(game.view);
        game.init();
        game.start();
        dispatch(start());
        return () => {
            game.clear();
            game.destroy(true, true);
        }

    }, []);

    return (<div>
        <button onClick={() => dispatch(start())}>Start game</button>
        <div>State: {state}</div>
        <div ref={ref}></div>
    </div>);
}


export default Game;
